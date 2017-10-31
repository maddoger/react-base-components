import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Color from 'color'

import ColorDropdown from './color_dropdown'

class ColorPicker extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    customColor: PropTypes.bool,
  }

  static defaultProps = {
    colors: ['#F3C421', '#6FCCF9', '#4BA0FF', '#3B65FF', '#0932F8', '#50E77B', '#09832C', '#FF4F7D'],
    customColor: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onColorOnClick = (e) => {
    const value = Color(e.currentTarget.style.color).hex()
    this.onChange(value)
  }

  onChange = (value) => {
    this.setState({
      value,
    }, () => {
      const { onChange } = this.props
      if (onChange(value)) {
        onChange(value)
      }
    })
  }

  render() {
    const { className, colors, customColor } = this.props
    const { value } = this.state
    const colorInList = colors && (colors.indexOf(value) > -1)
    return (
      <div className={cn('color-picker', className)}>
        {colors.map(color => (
          <button
            key={color}
            className={cn({
              'color-picker_color': true,
              '-active': value ? (color.toLowerCase() === value.toLowerCase()) : false,
            })}
            style={{ color }}
            onClick={this.onColorOnClick}
          >
            <span className="color-picker_preview" />
          </button>
        ))}
        {customColor &&
        <ColorDropdown value={colorInList ? '' : value} onChange={this.onChange} active={!colorInList} />}
      </div>
    )
  }
}

export default ColorPicker
