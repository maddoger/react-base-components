import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge, propOr, omit } from 'ramda'
import Textarea from 'react-textarea-autosize'
import PhoneInput from './phone_input'
import MaskedInput from './masked_input'

class TextInput extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hasError: PropTypes.bool,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    prefix: PropTypes.node,
    affix: PropTypes.node,
    size: PropTypes.string,
    multiline: PropTypes.bool,
    inputRef: PropTypes.func,
    autoFocus: PropTypes.bool,
    mask: PropTypes.any,
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

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  onChange = (e) => {
    const { onChange } = this.props
    const value = e.target.value
    if (onChange) {
      e.persist()
      onChange(value, e)
    }
  }

  onFocus = (e) => {
    this.setState({
      hasFocus: true,
    })
    const { onFocus } = this.props
    if (onFocus) {
      e.persist()
      onFocus(e)
    }
  }

  onBlur = (e) => {
    this.setState({
      hasFocus: false,
    })
    const { onBlur } = this.props
    if (onBlur) {
      e.persist()
      onBlur(e)
    }
  }

  onKeyDown = (e) => {
    e.persist()
    const { onPressEnter } = this.props
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e)
    }
    const { onKeyDown } = this.props
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  setInputRef = (ref) => {
    this.inputRef = ref
    const { inputRef } = this.props
    if (inputRef) {
      inputRef(ref)
    }
  }

  focus() {
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  render() {
    const {
      className,
      inputClassName,
      disabled,
      required,
      hasError,
      prefix,
      affix,
      size,
      multiline,
      mask,
      type,
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
    const inputProps = merge(
      omit(
        [
          'affix',
          'autoCompleteProps',
          'autoFocus',
          'className',
          'hasError',
          'inputClassName',
          'inputRef',
          'multiline',
          'onBlur',
          'onChange',
          'onFocus',
          'onKeyDown',
          'onPressEnter',
          'prefix',
          'size',
        ],
        this.props
      ),
      {
        className: cn({
          'text-input_input': true,
          [inputClassName]: !!inputClassName,
        }),
        disabled,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        ref: this.setInputRef,
      }
    )
    let InputElement = 'input'
    if (mask) {
      InputElement = MaskedInput
      inputProps.guide = propOr(true, 'guide', inputProps)
      delete inputProps.ref
      inputProps.inputRef = this.setInputRef
    } else if (multiline) {
      InputElement = Textarea
      delete inputProps.type
      delete inputProps.ref
      inputProps.inputRef = this.setInputRef
    } else if (type === 'tel') {
      InputElement = PhoneInput
      delete inputProps.ref
      inputProps.inputRef = this.setInputRef
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
