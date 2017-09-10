import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge } from 'ramda'
import Icon from './icon'
import Loader from './loader'

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
    size: PropTypes.string,
    loading: PropTypes.bool,
  }

  handleChange = (e) => {
    const { onChange } = this.props
    const value = e.currentTarget.value
    const checked = e.currentTarget.checked
    if (onChange) {
      onChange(checked, value, e)
    }
  }

  render() {
    const { className, id, checked, hasError, label, size, loading, ...inputProps } = this.props
    const classes = cn('checkbox', {
      '-has-error': hasError,
      '-checked': checked,
      '-loading': loading,
      [`-size-${size}`]: !!size,
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
            {loading && <Loader className="checkbox_loader" />}
          </span>
          {label && <span className="checkbox_label">{label}</span>}
        </span>
      </label>
    )
  }
}

export default Checkbox
