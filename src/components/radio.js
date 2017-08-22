import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge } from 'ramda'

class Radio extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    hasError: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.node,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  handleChange = (e) => {
    const { onChange } = this.props
    const value = e.currentTarget.value
    const checked = e.currentTarget.checked
    if (onChange) {
      onChange(e, checked, value)
    }
  }

  render() {
    const { className, id, checked, hasError, label, ...inputProps } = this.props
    const classes = cn('radio', {
      '-has-error': hasError,
      '-checked': checked,
    }, className)
    const props = merge(inputProps, {
      type: 'radio',
      id,
      checked,
      onChange: this.handleChange,
    })
    return (
      <label className={classes} htmlFor={id}>
        <input className="radio_input" {...props} />
        <span className="radio_inner">
          <span className="radio_container">
            <span className="radio_box" />
            <span className="radio_check" />
          </span>
          {label && <span className="radio_label">{label}</span>}
        </span>
      </label>
    )
  }
}

export default Radio
