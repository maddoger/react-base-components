import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

class DropdownContent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    containerPosition: PropTypes.object,
    position: PropTypes.arrayOf(PropTypes.oneOf([
      'downFromTop', 'downFromBottom',
      'upFromTop', 'upFromBottom',
      'leftFromLeft', 'leftFromRight',
      'rightFromLeft', 'rightFromRight',
    ])),
  }

  static defaultProps = {
    position: ['downFromBottom', 'rightFromLeft'],
  }
  static contextTypes = {
    dropdown: PropTypes.object,
  }

  render() {
    const { className, children, containerPosition, open, position } = this.props
    const style = {}
    if (containerPosition) {
      style.position = 'fixed'
      position.forEach((attr) => {
        switch (attr) {
          case 'downFromTop':
            style.top = (containerPosition.top) + 'px'
            break
          case 'downFromBottom':
            style.top = (containerPosition.top + containerPosition.height) + 'px'
            break
          case 'upFromTop':
            style.bottom = (containerPosition.bottom + containerPosition.height) + 'px'
            break
          case 'upFromBottom':
            style.bottom = (containerPosition.bottom) + 'px'
            break
          case 'leftFromLeft':
            style.right = (containerPosition.right + containerPosition.width) + 'px'
            break
          case 'leftFromRight':
            style.right = (containerPosition.right) + 'px'
            break
          case 'rightFromLeft':
            style.left = (containerPosition.left) + 'px'
            break
          case 'rightFromRight':
            style.left = (containerPosition.left + containerPosition.width) + 'px'
            break
          default:
            //
        }
      })
    }
    return (
      <CSSTransition in={open} mountOnEnter unmountOnExit classNames="" timeout={200}>
        <div className={cn('dropdown_content', className)} role="dialog" style={style}>
          {children}
        </div>
      </CSSTransition>
    )
  }
}

export default DropdownContent

