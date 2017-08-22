import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge } from 'ramda'
import Icon from './icon'

class Checkbox extends PureComponent {
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
    const classes = cn('checkbox', {
      '-has-error': hasError,
      '-checked': checked,
    }, className)
    const props = merge(inputProps, {
      type: 'checkbox',
      id,
      checked,
      onChange: this.handleChange,
    })
    return (
      <label className={classes} htmlFor={id}>
        <input className="checkbox_input" {...props} />
        <span className="checkbox_inner">
          <span className="checkbox_container">
            <span className="checkbox_box" />
            <Icon icon="checkbox_check" className="checkbox_check" />
          </span>
          {label && <span className="checkbox_label">{label}</span>}
        </span>
      </label>
    )
  }
}

export default Checkbox
