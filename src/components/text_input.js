import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge } from 'ramda'

class TextInput extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hasError: PropTypes.bool,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    prefix: PropTypes.node,
    affix: PropTypes.node,
    size: PropTypes.string,
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    type: 'text',
  }

  constructor(props) {
    super(props)
    this.state = {
      hasFocus: false,
    }
  }

  setRef = (ref) => {
    this.input = ref
  }

  handleChange = (e) => {
    const { onChange } = this.props
    const value = e.currentTarget.value
    if (onChange) {
      onChange(e, value)
    }
  }

  handleFocus = () => {
    this.setState({
      hasFocus: true,
    })
  }

  handleBlur = () => {
    this.setState({
      hasFocus: false,
    })
  }

  handleKeyDown = (e) => {
    const { onPressEnter } = this.props
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e)
    }
  }

  focus() {
    if (this.input) {
      this.input.focus()
    }
  }

  render() {
    const {
      id,
      className,
      inputClassName,
      type,
      name,
      value,
      defaultValue,
      placeholder,
      disabled,
      required,
      hasError,
      prefix,
      affix,
      onPressEnter,
      size,
      rows,
      ...rest
    } = this.props
    const {
      hasFocus,
    } = this.state

    const containerProps = {
      className: cn({
        'text-input': true,
        '-disabled': disabled,
        '-required': required,
        '-has-error': hasError,
        '-focus': hasFocus,
        [`-size-${size}`]: !!size,
        [className]: !!className,
      }),
    }
    const inputProps = merge(rest, {
      id,
      className: cn({
        'text-input_input': true,
        [inputClassName]: !!inputClassName,
      }),
      defaultValue,
      name,
      value,
      type,
      placeholder,
      disabled,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: onPressEnter ? this.handleKeyDown : null,
      ref: this.setRef,
    })
    let InputElement = 'input'
    if (rows) {
      InputElement = 'textarea'
      inputProps.rows = rows
      delete inputProps.type
    }
    return (
      <div {...containerProps}>
        <div className="text-input_container">
          {prefix}
          <InputElement {...inputProps} />
          {affix}
        </div>
      </div>
    )
  }
}

export default TextInput
