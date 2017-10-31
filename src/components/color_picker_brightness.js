import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

class ColorPickerBrightness extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  componentDidUpdate() {
    this.renderGradient()
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  setRef = (node) => {
    this.canvas = node
    if (node) {
      this.parent = node.parentNode
      this.canvas.width = this.parent.offsetWidth
      this.canvas.height = this.parent.offsetHeight
      this.canvasCtx = node.getContext('2d')
      this.renderGradient()
    }
  }

  handleChange = (event) => {
    const canvas = this.canvas
    if (!canvas) {
      return
    }
    const { value } = this.props
    const rect = canvas.getBoundingClientRect()
    const y = 1 - Math.min(rect.height, Math.max(0, event.clientY - rect.top)) / rect.height
    const b = y * 100
    this.props.onChange(
      Color(value)
        .hsv()
        .value(b)
        .hsl()
        .string()
    )
  }

  handleMouseDown = (e) => {
    this.handleChange(e)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  renderGradient() {
    const canvas = this.canvas

    if (!canvas) {
      return
    }
    const ctx = this.canvasCtx
    const width = canvas.width
    const height = canvas.height

    const originalColor = Color(this.props.value).hsv()
    const b = originalColor.value()
    const color = Color(originalColor).value(100)

    ctx.fillStyle = color.hex()
    ctx.fillRect(0, 0, width, height)

    const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height)
    brightnessGradient.addColorStop(0, 'rgba(0,0,0,0)')
    brightnessGradient.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = brightnessGradient
    ctx.fillRect(0, 0, width, height)

    const y = (1 - b / 100) * height
    ctx.fillStyle = 'none'
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(0, y - 2, width, 4)
    ctx.closePath()
    ctx.stroke()
  }

  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <canvas
          className="color-dropdown_canvas"
          onClick={this.handleChange}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
          ref={this.setRef}
          width="100%"
          height="100%"
        />
      </div>
    )
  }
}

export default ColorPickerBrightness
