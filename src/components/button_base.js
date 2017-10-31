import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { merge, omit } from 'ramda'
import { Link, NavLink } from 'react-router-dom'

class ButtonBase extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    autoFocus: PropTypes.bool,
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
    innerRef: PropTypes.func,
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

  componentDidMount() {
    if (this.props.autoFocus && this.ref) {
      this.ref.focus()
    }
  }

  setRef = (ref) => {
    this.ref = ref
    if (this.props.innerRef) {
      this.props.innerRef(ref)
    }
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
    } = this.props

    let Element = component
    const props = merge({
      className: cn({
        [className]: true,
        '-disabled': disabled,
        '-hover': hover,
        '-loading': loading,
        '-active': active,
        [activeClassName]: activeClassName && active,
      }),
      children,
      ref: this.setRef,
    }, omit([
      'className',
      'component',
      'children',
      'active',
      'activeClassName',
      'to',
      'href',
      'type',
      'role',
      'disabled',
      'loading',
      'hover',
      'autoFocus',
      'innerRef',
    ], this.props))

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
