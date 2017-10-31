import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Radio from './radio'

class RadioGroup extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node,
    })),
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  onChange = (value, checked) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(checked ? value : null)
    }
  }

  render() {
    const { className, options, name, value } = this.props
    return (
      <div className={cn('radio-group', className)}>
        {options.map(item => (
          <div key={item.value} className="radio-group_item">
            <Radio
              checked={value === item.value}
              name={name}
              value={item.value}
              label={item.label}
              onChange={this.onChange.bind(null, item.value)}
              className="radio-group_radio"
            />
          </div>
        ))}
      </div>
    )
  }
}

export default RadioGroup
