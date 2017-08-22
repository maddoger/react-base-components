import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link, NavLink } from 'react-router-dom'

class ButtonBase extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    href: PropTypes.string,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.string,
    ]),
    type: PropTypes.string,
    role: PropTypes.string,
    tabIndex: PropTypes.number,
    // State
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    hover: PropTypes.bool,
    // Handlers
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  render() {
    const {
      component = 'button',
      children,
      className,
      active,
      activeClassName,
      to,
      href,
      type = 'button',
      role,
      disabled,
      loading,
      hover,
      ...rest
    } = this.props

    let Element = component
    const props = {
      className: cn({
        [className]: true,
        '-disabled': disabled,
        '-hover': hover,
        '-loading': loading,
        '-active': active,
        [activeClassName]: activeClassName && active,
      }),
      children,
      ...rest,
    }
    if (href) {
      Element = 'a'
      props.href = href
    } else if (to) {
      if (activeClassName && active === undefined) {
        Element = NavLink
        props.activeClassName = activeClassName
      } else {
        Element = Link
      }
      props.to = to
    }

    if (Element === 'button') {
      props.type = type
      props.disabled = disabled
    } else if (Element !== 'a') {
      props.role = role || 'button'
    }

    return <Element {...props} />
  }
}

export default ButtonBase
