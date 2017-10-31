import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Color from 'color'

import Icon from './icon'
import ColorPickerHue from './color_picker_hue'
import ColorPickerBrightness from './color_picker_brightness'
import Dropdown from './dropdown'
import DropdownTrigger from './dropdown_trigger'
import DropdownContent from './dropdown_content'
import TextInput from './text_input'

class ColorDropdown extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    emptyValue: PropTypes.string,
    onChange: PropTypes.func,
    active: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const value = props.value || props.emptyValue
    this.state = {
      value,
      hsl: this.hexToHSL(value),
      inputValue: null,
      inputInFocus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && (nextProps.value !== this.state.value)) {
      this.setState({
        value: nextProps.value,
        hsl: this.hexToHSL(nextProps.value),
      })
    }
  }

  onInputFocus = () => {
    this.setState({
      inputInFocus: true,
      inputValue: this.state.value,
    })
  }

  onInputBlur = (event) => {
    const inputValue = event.target.value
    this.setState({ inputInFocus: false, inputValue: null })
    this.onChangeHSL(this.hexToHSL(inputValue))
  }

  onInputChange = (inputValue) => {
    this.setState({ inputValue })
    this.onChangeHSL(this.hexToHSL(inputValue))
  }

  onChangeHSL = (hsl) => {
    if (this.state.hsl !== hsl) {
      const hex = this.hslToHex(hsl)
      this.setState({
        value: hex,
        hsl,
      }, () => {
        const { onChange } = this.props
        if (onChange) {
          onChange(hex)
        }
      })
    }
  }

  hexToHSL(color) {
    try {
      return Color(color).hsl().string()
    } catch (e) {
      return ''
    }
  }

  hslToHex(color) {
    try {
      return Color(color).hex()
    } catch (e) {
      return ''
    }
  }

  render() {
    const { className, active } = this.props
    const { value, hsl, inputValue } = this.state

    return (
      <Dropdown className={cn('color-dropdown', className)}>
        <DropdownTrigger className="color-dropdown_trigger">
          <span className={cn('color-picker_color', { '-active': active })}
            style={{ color: value }}>
            <span className="color-picker_preview" />
            <Icon icon="chevron_select" className="color-picker_arrow" />
          </span>
        </DropdownTrigger>
        <DropdownContent className="color-dropdown_content" position={['downFromTop', 'leftFromRight']}>
          <div className="color-dropdown_header">
            <div className="color-dropdown_title">Choose color</div>
            <div className="color-dropdown_preview">
              <span className="color-picker_color -dropdown"
                style={{ color: value }}>
                <span className="color-picker_preview" />
                <Icon icon="chevron_select" className="color-picker_arrow" />
              </span>
            </div>
          </div>
          <div className="color-dropdown_pickers">
            <ColorPickerHue
              className="color-dropdown_hue"
              value={hsl}
              onChange={this.onChangeHSL}
            />
            <ColorPickerBrightness
              className="color-dropdown_brightness"
              value={hsl}
              onChange={this.onChangeHSL}
            />
          </div>
          <TextInput
            name="color"
            className="color-dropdown_input"
            value={inputValue || value}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            onChange={this.onInputChange}
          />
        </DropdownContent>
      </Dropdown>
    )
  }
}

export default ColorDropdown
