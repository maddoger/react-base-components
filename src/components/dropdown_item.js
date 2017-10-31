import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { omit } from 'ramda'

class DropdownItem extends PureComponent {
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
    if (closeOnClick && this.context.dropdown) {
      this.context.dropdown.close()
    }
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const props = omit(['className', 'onClick', 'closeOnClick'], this.props)
    return (
      <div className={cn('dropdown_item', this.props.className)} {...props}
        onClick={this.onClick} role="button" tabIndex={0} />
    )
  }
}

export default DropdownItem
