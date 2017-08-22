import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

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
  }

  static defaultProps = {
    type: 'checkbox',
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
    const { className, id, checked, hasError, ...inputProps } = this.props
    delete inputProps.onChange
    return (
      <label className={cn('toggle', { '-checked': checked, '-has-error': hasError }, className)} htmlFor={id}>
        <input className="toggle_input" id={id} checked={checked} onChange={this.handleChange} {...inputProps} />
        <div className="toggle_track">
          <div className="toggle_handle" />
        </div>
      </label>
    )
  }
}

export default Toggle
