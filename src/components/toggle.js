import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge } from 'ramda'
import Loader from './loader'

class Toggle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
    hasError: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    type: 'checkbox',
  }

  handleChange = (e) => {
    const { onChange } = this.props
    const value = e.currentTarget.value
    const checked = e.currentTarget.checked
    e.currentTarget.focus()
    if (onChange) {
      onChange(checked, value, e)
    }
  }

  render() {
    const { className, id, checked, hasError, loading, disabled, ...inputProps } = this.props
    const classes = cn('toggle', {
      '-checked': checked,
      '-has-error': hasError,
      '-loading': loading,
      '-disabled': disabled,
    }, className)
    const props = merge(inputProps, {
      id,
      checked,
      disabled,
      onChange: this.handleChange,
    })
    return (
      <label className={classes} htmlFor={id}>
        <input className="toggle_input" {...props} />
        <span className="toggle_inner">
          <span className="toggle_track">
            <span className="toggle_handle" />
          </span>
          {loading && <Loader className="toggle_loader" />}
        </span>
      </label>
    )
  }
}

export default Toggle
