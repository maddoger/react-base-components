import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class DropdownTrigger extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    returnChildren: PropTypes.bool,
    open: PropTypes.bool,
  }

  static contextTypes = {
    dropdown: PropTypes.object,
  }

  onClick = (e) => {
    const { onClick } = this.props
    const { dropdown } = this.context
    if (dropdown) {
      dropdown.toggle()
    }
    if (onClick) {
      this.onClick(e)
    }
  }

  render() {
    const { className, children, returnChildren, open } = this.props

    const childProps = {
      className: cn('dropdown_trigger', className, { '-open': open }),
      onClick: this.onClick,
    }
    if (returnChildren) {
      return React.cloneElement(children, childProps)
    }
    return <button type="button" {...childProps}>{children}</button>
  }
}

export default DropdownTrigger

