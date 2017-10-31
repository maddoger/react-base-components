import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import cn from 'classnames'
import raf from 'raf'
import ResizeObserver from 'resize-observer-polyfill'

class Collapse extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    childrenClassName: PropTypes.node,
    children: PropTypes.node,
    isOpened: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    isOpened: true,
    mountOnEnter: false,
    unmountOnExit: false,
  }

  constructor(props, context) {
    super(props, context)
    this.contentHeight = null
    this.contentNode = null
    this.contentState = null
    this.contentOnState = {
      onExit: this.setContentState.bind(this, 'exit'),
      onExiting: this.setContentState.bind(this, 'exiting'),
      onExited: this.setContentState.bind(this, 'exited'),
      onEnter: this.setContentState.bind(this, 'enter'),
      onEntering: this.setContentState.bind(this, 'entering'),
      onEntered: this.setContentState.bind(this, 'entered'),
    }
  }

  componentWillMount() {
    this.resizeObserver = new ResizeObserver(this.onResize)
  }

  onResize = (entities) => {
    if (entities && entities[0]) {
      this.contentHeight = entities[0].contentRect.height

      if (this.contentState === 'exit' || this.contentState === 'entering') {
        this.setHeight(this.contentHeight)
      }
    }
  }

  setHeight(value) {
    this.contentNode.style.height = value ? value + 'px' : null
  }

  setContentRef = (node) => {
    if (this.resizeObserver) {
      if (node) {
        this.resizeObserver.observe(node)
      } else {
        this.resizeObserver.disconnect()
      }
    }
    this.contentRef = node
  }

  setContentState = (state, node) => {
    this.contentState = state
    this.contentNode = node
    switch (state) {
      case 'exit':
        this.setHeight(this.contentHeight)
        break
      case 'exiting':
        raf(() => {
          this.setHeight(0)
        })
        break
      case 'enter':
        this.setHeight(0)
        break
      case 'entering':
        raf(() => {
          this.setHeight(this.contentHeight)
        })
        break
      case 'entered':
        this.setHeight(null)
        break
      default:
    }
  }

  render() {
    const { className, childrenClassName, children, mountOnEnter, unmountOnExit, isOpened } = this.props
    return (
      <CSSTransition
        in={isOpened}
        timeout={400}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        classNames=""
        {...this.contentOnState}
      >
        <div className={cn('collapse', isOpened ? '-opened' : '-closed', className)}>
          <div ref={this.setContentRef} className={childrenClassName}>{children}</div>
        </div>
      </CSSTransition>
    )
  }
}

export default Collapse
