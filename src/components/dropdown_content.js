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
    triangle: PropTypes.oneOf(['bottom']),
    position: PropTypes.arrayOf(PropTypes.oneOf([
      'downFromTop', 'downFromBottom',
      'upFromTop', 'upFromBottom',
      'leftFromLeft', 'leftFromRight',
      'rightFromLeft', 'rightFromRight',
      'fullWidth', 'autoVertical',
    ])),
  }

  static defaultProps = {
    position: ['downFromBottom', 'rightFromLeft'],
  }

  static contextTypes = {
    dropdown: PropTypes.object,
  }

  setRef = (ref) => {
    this.contentRef = ref
    if (ref) {
      this.height = ref.clientHeight
      this.forceUpdate()
    }
  }

  render() {
    const { className, children, containerPosition, open, position, triangle } = this.props
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
            style.bottom = (containerPosition.fromBottom + containerPosition.height) + 'px'
            break
          case 'upFromBottom':
            style.bottom = (containerPosition.fromBottom) + 'px'
            break
          case 'leftFromLeft':
            style.right = (containerPosition.fromRight + containerPosition.width) + 'px'
            break
          case 'leftFromRight':
            style.right = (containerPosition.fromRight) + 'px'
            break
          case 'rightFromLeft':
            style.left = (containerPosition.left) + 'px'
            break
          case 'rightFromRight':
            style.left = (containerPosition.left + containerPosition.width) + 'px'
            break
          case 'fullWidth':
            style.left = (containerPosition.left) + 'px'
            style.minWidth = containerPosition.width + 'px'
            break
          case 'autoVertical': {
            const dialogHeight = (this.height || 200) + 10
            if (containerPosition.bottom + dialogHeight < window.innerHeight) {
              style.top = (containerPosition.top + containerPosition.height) + 'px'
            } else {
              style.bottom = (containerPosition.fromBottom + containerPosition.height) + 'px'
            }
            break
          }
          default:
          //
        }
      })
    }
    const content = (
      <div className={cn('dropdown_content', className)} role="dialog" style={style} ref={this.setRef}>
        {children}
        {triangle && <div className={cn('dropdown_triangle', '-' + triangle)} />}
      </div>
    )
    return (
      <CSSTransition in={open} mountOnEnter unmountOnExit classNames="" timeout={200}>
        {this.height ? content : <div style={{ overflow: 'hidden', height: 0 }}>{content}</div>}
      </CSSTransition>
    )
  }
}

export default DropdownContent

