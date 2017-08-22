import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { find, propEq } from 'ramda'
import Icon from './icon'

class Select extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    items: PropTypes.array,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hasError: PropTypes.bool,
    size: PropTypes.string,
    renderOption: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      hasFocus: false,
    }
  }

  handleChange = (e) => {
    const { onChange, items } = this.props
    const value = e.currentTarget.value
    const item = items.indexOf(value) > -1 ? value : find(propEq('value', value))(items)
    if (onChange) {
      onChange(e, value, item)
    }
  }

  handleFocus = () => {
    this.setState({
      hasFocus: true,
    })
  }

  handleBlur = () => {
    this.setState({
      hasFocus: false,
    })
  }

  renderOption(item, key) {
    if (typeof item === 'object') {
      return <option key={item.value} value={item.value}>{item.label}</option>
    }
    return <option key={key} value={item}>{item}</option>
  }

  renderOptions() {
    const { items, renderOption } = this.props
    return items.map(renderOption || this.renderOption)
  }

  render() {
    const {
      id,
      className,
      name,
      children,
      value,
      defaultValue,
      disabled,
      required,
      hasError,
      size,
    } = this.props

    const {
      hasFocus,
    } = this.state

    const containerProps = {
      className: cn({
        select: true,
        '-disabled': disabled,
        '-required': required,
        '-has-error': hasError,
        '-focus': hasFocus,
        [`-size-${size}`]: !!size,
        [className]: !!className,
      }),
    }

    const selectProps = {
      id,
      className: cn('select_select', className),
      name,
      value,
      defaultValue,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      children: children || this.renderOptions(),
    }
    return (
      <div {...containerProps}>
        <select {...selectProps} />
        <Icon icon="chevron_select" className="select_chevron" />
      </div>
    )
  }
}

Select.Option = props => <option {...props} />

export default Select
