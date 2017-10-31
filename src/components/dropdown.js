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
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
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
      open: this.open,
      close: this.close,
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
        this.open()
      } else {
        this.close()
      }
    }
  }

  onClickOutside = () => {
    const { open } = this.state
    if (open) {
      this.close()
    }
  }

  onPositionChange = (containerPosition) => {
    this.setState({
      containerPosition,
    })
  }

  onKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  isOpen = () => this.state.open

  close = () => {
    const { onClose } = this.props
    this.setState({
      open: false,
    }, () => {
      if (onClose) {
        onClose()
      }
    })
  }

  open = () => {
    const { onOpen } = this.props
    this.setState({
      open: true,
    }, () => {
      if (onOpen) {
        onOpen()
      }
    })
  }

  toggle = () => {
    const { open } = this.state
    if (open) {
      this.close()
    } else {
      this.open()
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
        onKeyDown={this.onKeyPress}
      >
        <FixedContainer className="dropdown_container" active={open} onChange={this.onPositionChange}>
          {React.Children.map(children, child =>
            React.isValidElement(child) && typeof child.type !== 'string'
              ? React.cloneElement(child, { open, containerPosition })
              : child
          )}
        </FixedContainer>
      </ClickOutside>
    )
  }
}

export default Dropdown

