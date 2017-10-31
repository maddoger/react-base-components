import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

class ColorPickerHue extends PureComponent {
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
    const x = Math.min(rect.width, Math.max(0, event.clientX - rect.left)) / rect.width
    const y = 1 - Math.min(rect.height, Math.max(0, event.clientY - rect.top)) / rect.height

    const h = 359 * x
    const s = 100 * y

    this.props.onChange(
      Color(value)
        .hsv()
        .hue(h)
        .saturationv(s)
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
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, 'rgb(255, 0, 0)')
    gradient.addColorStop(1 / 6, 'rgb(255, 255, 0)')
    gradient.addColorStop(2 / 6, 'rgb(0, 255, 0)')
    gradient.addColorStop(3 / 6, 'rgb(0, 255, 255)')
    gradient.addColorStop(4 / 6, 'rgb(0,0,255)')
    gradient.addColorStop(5 / 6, 'rgb(255, 0, 255)')
    gradient.addColorStop(1, 'rgb(255, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const saturationGradient = ctx.createLinearGradient(0, 0, 0, height)
    saturationGradient.addColorStop(0, 'rgba(255,255,255,0)')
    saturationGradient.addColorStop(1, 'rgba(255,255,255,1)')
    ctx.fillStyle = saturationGradient
    ctx.fillRect(0, 0, width, height)


    const { value } = this.props
    const color = Color(value).hsv()
    const h = color.hue()
    const s = color.saturationv()
    const x = (h / 359) * width
    const y = (1 - s / 100) * height

    ctx.fillStyle = 'none'
    ctx.strokeStyle = '#eaeaea'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
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
        />
      </div>
    )
  }
}

export default ColorPickerHue
