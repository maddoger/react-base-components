import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ButtonToolbar from './button_toolbar'
import ButtonBase from './button_base'

class RadioButtonGroup extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node,
    })),
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  onClick = (value) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(value)
    }
  }

  render() {
    const { className, options, value } = this.props
    return (
      <ButtonToolbar className={className} equal stick block>
        {options.map(item => (
          <ButtonBase
            className="radio-button"
            key={item.value}
            active={value === item.value}
            onClick={this.onClick.bind(null, item.value)}
          >
            {item.label}
          </ButtonBase>
        ))}
      </ButtonToolbar>
    )
  }
}

export default RadioButtonGroup
