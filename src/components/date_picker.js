import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import DayPicker from 'react-day-picker'
import LocaleUtils from 'react-day-picker/moment'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { dateFormatSelector } from '../profile/profile_selectors'

import TextInput from './text_input'
import Dropdown from './dropdown'
import DropdownContent from './dropdown_content'
import IconButton from './icon_button'

class DatePicker extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func, // on change input value
    onDayChange: PropTypes.func, // on change day
    selectedDay: PropTypes.object,
    dayPickerProps: PropTypes.object,
    inputProps: PropTypes.object,
    format: PropTypes.string,
    formatFromProfile: PropTypes.string,
    showIcon: PropTypes.bool,
  }

  static defaultProps = {
    dayPickerProps: {},
    inputProps: {},
    showIcon: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      month: null,
      value: '',
      ...this.getStateFromProps(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      this.setState(this.getStateFromProps(nextProps))
    }
  }

  onChange = (value, e) => {
    const { onChange, onDayChange } = this.props
    const m = moment(value, this.getFormat(), true)

    if (onChange) {
      e.persist()
      onChange(value, e)
    }

    if (value.trim() === '') {
      this.setState({ value })
      if (onDayChange) {
        onDayChange(null)
      }
      return
    }

    if (!m.isValid()) {
      this.setState({ value })
      return
    }

    this.setState({ value, month: m }, () => {
      if (onDayChange) {
        onDayChange(m)
      }
    })
  }

  onDayClick = (day) => {
    const format = this.getFormat()
    const { onDayChange } = this.props
    if (onDayChange) {
      onDayChange(moment(day))
    }
    this.setState({
      value: moment(day).format(format),
      open: false,
    })
  }

  getFormat() {
    let format = this.props.format
    if (!format) {
      format = this.props.formatFromProfile || 'MM/DD/YYYY'
    }
    return format
  }

  getMask() {
    return this.getFormat().split('').map((char) => {
      if (char === 'M' || char === 'D' || char === 'Y') {
        return /\d/
      }
      return char
    })
  }

  getStateFromProps(props) {
    let month
    let value = ''
    if (props.value) {
      const m = moment(props.value, this.getFormat(), true)
      if (m.isValid()) {
        month = m
      }
      value = props.value
    } else if (props.selectedDay) {
      const m = moment(props.selectedDay)
      if (m.isValid()) {
        month = m
        value = m.format(this.getFormat())
      }
    }

    return {
      value,
      month: month ||
        props.dayPickerProps.initialMonth ||
        props.dayPickerProps.month ||
        moment(),
    }
  }

  setInputRef = (ref) => {
    this.inputRef = ref
  }

  setPickerRef = (ref) => {
    this.pickerRef = ref
  }

  close = () => {
    this.setState({
      open: false,
    })
  }

  open = () => {
    this.setState({
      open: true,
    })
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  renderPicker() {
    let selectedDay
    const { dayPickerProps } = this.props
    const value = this.state.value || this.props.value
    const m = moment(value, this.getFormat(), true)
    if (m.isValid()) {
      selectedDay = m.toDate()
    }

    return (
      <DayPicker
        {...dayPickerProps}
        ref={this.setPickerRef}
        localeUtils={LocaleUtils}
        onDayClick={this.onDayClick}
        month={this.state.month.toDate()}
        selectedDays={selectedDay}
      />
    )
  }

  render() {
    const { className, inputProps, showIcon } = this.props
    const { open, value } = this.state
    return (
      <Dropdown open={open} className={cn('date-picker', className)} onClose={this.close}>
        <div className="date-picker_control">
          <TextInput
            ref={this.setInputRef}
            className="date-picker_input"
            onClick={this.open}
            onFocus={this.open}
            value={value}
            onChange={this.onChange}
            placeholder={this.getFormat()}
            mask={this.getMask()}
            guide
            affix={showIcon &&
              <IconButton icon="calendar_small" className="date-picker_icon-button" onClick={this.open} />}
            {...inputProps}
          />
        </div>
        <DropdownContent position={['rightFromLeft', 'downFromBottom']} className="date-picker_dropdown-content">
          {this.renderPicker()}
        </DropdownContent>
      </Dropdown>
    )
  }
}

export default connect(createStructuredSelector({
  formatFromProfile: dateFormatSelector,
}))(DatePicker)
