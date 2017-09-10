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
  }

  static defaultProps = {
    closeOnClick: true,
  }

  static contextTypes = {
    dropdown: PropTypes.object,
  }

  onClick = (e) => {
    const { onClick, closeOnClick } = this.props
    if (closeOnClick) {
      this.context.dropdown.hide()
    }
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const props = omit(['className', 'onClick', 'closeOnClick'], this.props)
    return (
      <ButtonBase className={cn('dropdown_link', this.props.className)} {...props} onClick={this.onClick} />
    )
  }
}

export default DropdownLink
