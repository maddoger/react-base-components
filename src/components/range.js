import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { equals, minBy, range, reduce } from 'ramda'
import { t } from '../i18n'

class Range extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    handleWidth: PropTypes.number,
    formatValue: PropTypes.func,
    formatValues: PropTypes.func,
    showValues: PropTypes.bool,
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    showValues: true,
  }

  constructor(props) {
    super(props)
    this.handleRef = []
    this.onMouseDownHandlers = this.props.values.map((v, i) => this.onMouseDown.bind(null, i))
    this.setHandleRef = this.props.values.map((v, i) => (ref) => {
      this.handleRef[i] = ref
    })

    this.state = {
      dragHandle: false,
      values: this.props.values,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.values, this.state.values)) {
      this.setState({
        values: nextProps.values,
      })
    }
  }

  onChange = (values) => {
    this.setState({
      values,
    }, () => {
      const { onChange } = this.props
      if (onChange) {
        onChange(values)
      }
    })
  }

  onMouseDown = (handle, e) => {
    e.preventDefault()
    e.stopPropagation()
    window.addEventListener('mousemove', this.onMouseMove, true)
    window.addEventListener('touchmove', this.onMouseMove, true)
    window.addEventListener('mouseup', this.onMouseUp, true)
    window.addEventListener('touchend', this.onMouseUp, true)
    this.setState({
      dragHandle: handle,
    })
  }

  onMouseUp = () => {
    window.removeEventListener('mousemove', this.onMouseMove, true)
    window.removeEventListener('touchmove', this.onMouseMove, true)
    window.removeEventListener('mouseup', this.onMouseUp, true)
    window.removeEventListener('touchend', this.onMouseUp, true)
    this.setState({
      dragHandle: false,
    })
  }

  onMouseMove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = this.containerRef.getBoundingClientRect()
    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const x = 100 * Math.max(0, Math.min(1, (pageX - rect.left) / rect.width))
    const value = this.xToValue(x)
    const handleIndex = this.state.dragHandle
    let newIndex = handleIndex
    const values = [].concat(this.state.values)
    // Change handle if it is less than previous or greater than next
    for (let i = 0; i < values.length; i += 1) {
      if ((i < handleIndex && values[i] > value) || (i > handleIndex && values[i] < value)) {
        newIndex = i
        values[handleIndex] = values[newIndex]
        this.setState({ dragHandle: i })
        break
      }
    }
    values[newIndex] = value
    this.onChange(values)
  }

  onTrackClick = (e) => {
    const rect = this.containerRef.getBoundingClientRect()
    const x = 100 * Math.max(0, Math.min(1, (e.pageX - rect.left) / rect.width))
    const value = this.xToValue(x)
    const values = [].concat(this.state.values)
    const index = reduce(minBy(i => Math.abs(values[i] - value)), 0, range(0, values.length))
    values[index] = value
    this.onChange(values)
  }

  setContainerRef = (ref) => {
    this.containerRef = ref
  }

  valueToX = (value) => {
    const { min, max } = this.props
    return 100 * ((value - min) / (max - min))
  }

  xToValue = (x) => {
    const { min, max, step } = this.props
    const steps = (max - min) / step
    return min + Math.round((x / 100) * steps) * step
  }

  renderValues = () => {
    const { formatValue } = this.props
    const { values } = this.state
    return (
      <div className="range_values">
        {formatValue ? formatValue(values[0]) : values[0]}
        {' ' + t('to') + ' '}
        {formatValue ? formatValue(values[1]) : values[1]}
      </div>
    )
  }

  render() {
    const { className, formatValues, min, max, showValues } = this.props
    const { dragHandle, values } = this.state

    const valuesX = values.map(this.valueToX)

    const items = []
    valuesX.forEach((value, index) => {
      if (index > 0) {
        const prev = valuesX[index - 1]
        items.push(
          <div
            key={`s-${index}`}
            className="range_selection"
            style={{ left: prev + '%', width: (value - prev) + '%' }}
          />
        )
      }
      items.push(
        <div
          key={`h-${index}`}
          className={cn({ 'range_handle': true, '-drag': dragHandle === index })}
          onMouseDown={this.onMouseDownHandlers[index]}
          onTouchStart={this.onMouseDownHandlers[index]}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={values[index]}
          aria-disabled={false}
          ref={this.setHandleRef[index]}
          style={{ left: value + '%' }}
        />
      )
    })


    return (
      <div className={cn({ 'range': true, '-values': showValues }, className)}>
        {showValues && (formatValues ? formatValues({ values, min, max }) : this.renderValues())}
        <div className="range_container" ref={this.setContainerRef} onClick={this.onTrackClick}>
          <div className="range_track" />
          {items}
        </div>
      </div>
    )
  }
}

export default Range
