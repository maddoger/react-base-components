import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit, equals } from 'ramda'

// This element provides his client position to onPositionChange callback
class FixedContainer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    element: PropTypes.string,
    containerRef: PropTypes.func,
    onPositionChange: PropTypes.func.isRequired,
    onResize: PropTypes.func,
    active: PropTypes.bool,
  }

  static defaultProps = {
    active: true,
    element: 'div',
  }

  componentDidMount() {
    if (this.props.active) {
      this.addListeners()
      this.onEvent()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active && !this.props.active) {
      this.addListeners()
      this.onEvent()
    } else if (!nextProps.active && this.props.active) {
      this.removeListeners()
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  onEvent = (e) => {
    const { containerRef, lastPosition = {} } = this
    const parentRect = containerRef.getBoundingClientRect()
    const position = {
      left: parentRect.left,
      top: parentRect.top,
      rectRight: parentRect.right,
      rectBottom: parentRect.bottom,
      right: window.innerWidth - parentRect.right,
      bottom: window.innerHeight - parentRect.bottom,
      width: parentRect.width,
      height: parentRect.height,
    }
    if (!equals(position, lastPosition)) {
      const { onPositionChange, onResize } = this.props
      onPositionChange(position)
      if (onResize && e && (e.type === 'resize')) {
        onResize(e)
      }
    }
    if (e) {
      this.lastPosition = position
    }
  }

  setContainerRef = (ref) => {
    const { containerRef } = this.props
    this.containerRef = ref
    if (containerRef) {
      containerRef(ref)
    }
  }

  addListeners() {
    this.events.forEach(event => window.addEventListener(event, this.onEvent, event === 'scroll'))
  }

  removeListeners() {
    this.events.forEach(event => window.removeEventListener(event, this.onEvent, event === 'scroll'))
  }

  updatePosition() {
    this.onEvent()
  }

  events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load',
  ]

  render() {
    const props = omit(['element', 'containerRef', 'onPositionChange', 'onResize', 'active'], this.props)
    return (
      <div ref={this.setContainerRef} {...props} />
    )
  }
}

export default FixedContainer
