import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { omit } from 'ramda'
import ButtonBase from './button_base'

class DropdownLink extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    closeOnClick: PropTypes.bool,
    preset: PropTypes.string,
  }

  static defaultProps = {
    closeOnClick: true,
  }

  static contextTypes = {
    dropdown: PropTypes.object,
  }

  onClick = (e) => {
    const { onClick, closeOnClick } = this.props
    if (closeOnClick && this.context.dropdown) {
      this.context.dropdown.close()
    }
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const { preset, className } = this.props
    const props = omit(['className', 'onClick', 'closeOnClick', 'preset'], this.props)
    props.className = cn('dropdown_link', { [`-preset-${preset}`]: preset }, className)
    return (
      <ButtonBase tabIndex={0} {...props} onClick={this.onClick} />
    )
  }
}

export default DropdownLink
