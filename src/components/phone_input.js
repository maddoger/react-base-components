import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'ramda'
import { AsYouTypeFormatter } from 'google-libphonenumber'

class PhoneInput extends PureComponent {
  static propTypes = {
    inputRef: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.ayt = new AsYouTypeFormatter()
    const { formattedValue } = this.formatValue(this.props.value || '')
    this.state = {
      formattedValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined
      && nextProps.value !== this.props.value
      && nextProps.value !== this.state.formattedValue) {
      const { formattedValue } = this.formatValue(nextProps.value || '')
      this.setState({
        formattedValue,
      })
    }
  }

  onChange = (e) => {
    e.persist()
    const inputValue = e.target.value
    const { formattedValue, newCaretPosition } = this.formatValue(inputValue, this.inputRef.selectionStart)

    this.setState({
      formattedValue,
    }, () => {
      if (newCaretPosition > 0) {
        this.inputRef.setSelectionRange(newCaretPosition, newCaretPosition)
      }
      if (this.props.onChange) {
        this.props.onChange(e)
      }
    })
  }

  setRef = (ref) => {
    this.inputRef = ref
    if (this.props.inputRef) {
      this.props.inputRef(ref)
    }
  }

  formatValue(value, caretPosition) {
    let digitValue = value.replace(/\D/g, '')
    let formattedValue = ''
    let newCaretPosition = 0

    if (digitValue !== '') {
      digitValue = '+' + digitValue

      this.ayt.clear()
      const positions = []
      digitValue.split('').forEach((d) => {
        formattedValue = this.ayt.inputDigitAndRememberPosition(d)
        positions.push(this.ayt.getRememberedPosition())
      })

      // Find caret digit
      let caretDigitIndex = -1
      for (let i = 0; i < caretPosition; i += 1) {
        if (digitValue[caretDigitIndex + 1] === value[i]) {
          caretDigitIndex += 1
        }
      }
      newCaretPosition = (caretDigitIndex > -1) ? positions[caretDigitIndex] : 0
    }
    return { formattedValue, newCaretPosition }
  }

  render() {
    const props = omit(['onChange', 'inputRef', 'value'], this.props)
    return (
      <input
        maxLength={16}
        {...props}
        type="tel"
        ref={this.setRef}
        value={this.state.formattedValue}
        onChange={this.onChange}
      />
    )
  }
}

export default PhoneInput
