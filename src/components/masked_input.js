import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createTextMaskInputElement from 'vanilla-text-mask'
import { pick, omit } from 'ramda'

class MaskedInput extends Component {
  static propTypes = {
    mask: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.bool,
      PropTypes.shape({
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        pipe: PropTypes.func,
      }),
    ]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    showMask: PropTypes.bool,
    inputRef: PropTypes.func,
  }

  componentDidMount() {
    this.initTextMask()
  }

  componentDidUpdate() {
    this.initTextMask()
  }

  componentWillUnmount() {
    if (this.textMaskInputElement) {
      this.textMaskInputElement.destroy()
    }
  }

  onChange = (event) => {
    this.textMaskInputElement.textMaskInputElement.update()
    const { onChange } = this.props
    if (onChange) {
      onChange(event)
    }
  }

  setInputRef = (ref) => {
    this.inputRef = ref
    const { inputRef } = this.props
    if (inputRef) {
      inputRef(ref)
    }
  }

  initTextMask() {
    if (this.inputRef) {
      const value = this.props.value || this.props.defaultValue
      const options = pick(['mask', 'guide', 'pipe', 'placeholderChar', 'keepCharPositions', 'showMask'], this.props)

      this.textMaskInputElement = createTextMaskInputElement({
        inputElement: this.inputRef,
        ...options,
      })
      this.textMaskInputElement.textMaskInputElement.update(value)
    }
  }

  render() {
    const props = omit(
      ['mask', 'guide', 'pipe', 'placeholderChar', 'keepChagPositions', 'showMask', 'inputRef', 'onChange'],
      this.props
    )

    return (
      <input
        onInput={this.onChange}
        ref={this.setInputRef}
        {...props}
      />
    )
  }
}

export default MaskedInput
