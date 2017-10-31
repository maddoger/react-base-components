import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import DayPicker from 'react-day-picker'
import LocaleUtils from 'react-day-picker/moment'

import { t } from '../i18n'

import Icon from './icon'
import Dropdown from './dropdown'
import DropdownTrigger from './dropdown_trigger'
import DropdownContent from './dropdown_content'
import { INTERVALS } from '../api/filter'

const INTERVAL_LABELS_SHORT = {
  [INTERVALS.DAY]: '1D',
  [INTERVALS.WEEK]: '1W',
  [INTERVALS.MONTH]: '1M',
  [INTERVALS.YTD]: 'YTD',
  [INTERVALS.ALL]: 'ALL',
}
const INTERVAL_LABELS_LONG = {
  [INTERVALS.DAY]: 'TODAY',
  [INTERVALS.WEEK]: 'WEEK',
  [INTERVALS.MONTH]: 'MONTH',
  [INTERVALS.YTD]: 'YEAR',
  [INTERVALS.ALL]: 'ALL (MAX)',
}

class DateRangePicker extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    periodShortcut: PropTypes.string,
    intervals: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    short: PropTypes.bool,
    dropdownPosition: PropTypes.array,
  }

  static defaultProps = {
    intervals: [INTERVALS.DAY, INTERVALS.WEEK, INTERVALS.MONTH, INTERVALS.YTD, INTERVALS.ALL],
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      interval: null,
      // Picking
      from: null,
      to: null,
      enteredTo: null,
      picking: false,
    }
  }

  onChange = (values) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(values)
    }
  }

  onDayClick = (day) => {
    if (!this.state.picking) {
      this.setState({
        picking: true,
        startDate: day,
        endDate: day,
      })
    } else {
      const start = this.state.startDate
      const end = day
      this.setState({
        startDate: null,
        endDate: null,
        picking: false,
      }, () => {
        const swap = start.isAfter(end)
        this.onChange({
          startDate: (!swap ? start : end).startOf('day'),
          endDate: (!swap ? end : start).endOf('day'),
          periodShortcut: INTERVALS.CUSTOM,
        })
      })
    }
  }

  onDayMouseEnter = (day) => {
    if (this.state.picking) this.setState({ endDate: day })
  }

  onSetInterval = (interval) => {
    let startDate = moment().startOf('day')
    let endDate = moment().endOf('day')
    switch (interval) {
      case INTERVALS.DAY:
        break
      case INTERVALS.WEEK:
        startDate.subtract(7, 'days')
        break
      case INTERVALS.MONTH:
        startDate.subtract(30, 'days')
        break
      case INTERVALS.YTD:
        startDate.subtract(1, 'years')
        break
      case INTERVALS.ALL:
        startDate = undefined
        endDate = undefined
        break
      default:
    }
    this.onChange({
      startDate,
      endDate,
      periodShortcut: interval,
    })
  }

  onClose = () => {
    this.setState({
      picking: false,
      startDate: null,
      endDate: null,
    })
  }

  renderIntervals(short) {
    const { periodShortcut: interval, intervals } = this.props
    return intervals.map(item => (
      <span
        key={item}
        className={cn('date-range-picker_interval', interval === item && '-active')}
        onClick={this.onSetInterval.bind(null, item)}
      >
        {t(short ? INTERVAL_LABELS_SHORT[item] : INTERVAL_LABELS_LONG[item])}
      </span>
    ))
  }

  render() {
    const { className, dropdownPosition, short } = this.props
    const startDate = this.state.startDate || this.props.startDate
    const endDate = this.state.endDate || this.props.endDate
    return (
      <div className={cn('date-range-picker', short && '-short', className)}>
        <Dropdown className="date-range-picker_dropdown" onClose={this.onClose}>
          <DropdownTrigger className="date-range-picker_range">
            <Icon icon="calendar_small" className="date-range-picker_icon" />
            <span className="date-range-picker_date">
              {startDate && endDate ?
                t('{{startDate, date}} – {{endDate, date}}', { startDate, endDate }) :
                t('All Timeframe')
              }
            </span>
          </DropdownTrigger>
          <DropdownContent className="date-range-picker_dropdown-content"
            position={dropdownPosition || ['rightFromLeft', 'downFromBottom']}>
            <DayPicker
              localeUtils={LocaleUtils}
              fixedWeeks
              numberOfMonths={2}
              className="date-range-picker_picker -start-date"
              onDayMouseEnter={day => this.onDayMouseEnter(moment(day))}
              onDayClick={day => this.onDayClick(moment(day))}
              selectedDays={
                startDate && endDate ?
                  { from: startDate.clone().set({ hour: 12, minute: 0, second: 0 }).toDate(),
                    to: endDate.clone().set({ hour: 12, minute: 0, second: 0 }).toDate() } :
                  null
              }
            />
            <div className="date-range-picker_dropdown-intervals">
              {this.renderIntervals(false)}
            </div>
          </DropdownContent>
        </Dropdown>
        {!short && <span className="date-range-picker_intervals">
          {this.renderIntervals(short)}
        </span>}
      </div>
    )
  }
}

export default DateRangePicker
