import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ButtonBase from './button_base'

class TabButton extends Component {
  static propTypes = {
    className: PropTypes.node,
    children: PropTypes.node,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    eventKey: PropTypes.any,
  }

  handleOnClick = () => {
    const { onClick, eventKey } = this.props
    if (onClick) {
      onClick(eventKey)
    }
  }

  render() {
    const { className, children, active, eventKey, onClick, ...rest } = this.props
    const classes = cn('tab-button', className)
    return (
      <ButtonBase className={classes} active={active} activeClassName="-active" onClick={this.handleOnClick} {...rest}>
        {children}
      </ButtonBase>
    )
  }
}

export default TabButton
