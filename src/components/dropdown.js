import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ClickOutside from './click_outside'
import FixedContainer from './fixed_container'

class Dropdown extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    containerRef: PropTypes.func,
    style: PropTypes.object,
  }

  static defaultProps = {
    open: false,
  }

  static childContextTypes = {
    dropdown: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      containerPosition: {},
    }
  }

  getChildContext() {
    const dropdown = {
      show: this.show,
      hide: this.hide,
      isOpen: this.isOpen(),
      toggle: this.toggle,
    }
    return {
      dropdown,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      if (nextProps.open) {
        this.show()
      } else {
        this.hide()
      }
    }
  }

  onClickOutside = () => {
    const { open } = this.state
    if (open) {
      this.hide()
    }
  }

  onPositionChange = (containerPosition) => {
    this.setState({
      containerPosition,
    })
  }

  isOpen = () => this.state.open

  hide = () => {
    const { onHide } = this.props
    this.setState({
      open: false,
    }, () => {
      if (onHide) {
        onHide()
      }
    })
  }

  show = () => {
    const { onShow } = this.props
    this.setState({
      open: true,
    }, () => {
      if (onShow) {
        onShow()
      }
    })
  }

  toggle = () => {
    const { open } = this.state
    if (open) {
      this.hide()
    } else {
      this.show()
    }
  }

  render() {
    const { className, containerRef, style, children } = this.props
    const { open, containerPosition = {} } = this.state

    return (
      <ClickOutside
        active={open}
        className={cn('dropdown', className, { '-open': open })}
        ignoreClass="dropdown_content"
        onClickOutside={this.onClickOutside}
        containerRef={containerRef}
        style={style}
      >
        <FixedContainer className="dropdown_container" active={open} onPositionChange={this.onPositionChange}>
          {React.Children.map(children, child => React.cloneElement(child, { open, containerPosition }))}
        </FixedContainer>
      </ClickOutside>
    )
  }
}

export default Dropdown

