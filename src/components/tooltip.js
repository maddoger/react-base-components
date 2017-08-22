import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ClickOutside from './click_outside'

class Tooltip extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    tooltip: PropTypes.node,
    position: PropTypes.string,
  }

  static defaultProps = {
    position: 'top-center',
  }

  state = {
    active: false,
  }

  handleShow = () => {
    if (!this.state.active) {
      this.setState({
        active: !this.state.active,
      })
    }
  }

  handleHide = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      })
    }
  }

  render() {
    const { className, tooltip, children, position } = this.props
    const { active } = this.state
    return (
      <ClickOutside
        className={cn('tooltip-container', className)}
        active={active}
        onClick={this.handleShow}
        onClickOutside={this.handleHide}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
      >
        {children}
        {active && <div className={cn('tooltip', `-position-${position}`)} role="tooltip">{tooltip}</div>}
      </ClickOutside>
    )
  }
}

export default Tooltip
