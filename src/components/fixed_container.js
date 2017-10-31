import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { equals, omit } from 'ramda'
import ResizeObserver from 'resize-observer-polyfill'

class FixedContainer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    element: PropTypes.string,
    onChange: PropTypes.func,
    containerRef: PropTypes.func,
    active: PropTypes.bool,
    listenScroll: PropTypes.bool,
  }

  static defaultProps = {
    active: true,
    listenScroll: true,
  }

  componentWillMount() {
    this.resizeObserver = new ResizeObserver(this.measure)
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUpdate(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.addListeners()
      } else {
        this.removeListeners()
      }
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  onEvent = (e) => {
    this.measure(e && (e.type !== 'scroll'))
  }

  setRef = (node) => {
    if (this.resizeObserver) {
      if (node && this.props.active) {
        // observe
        this.resizeObserver.observe(node)
      } else {
        this.resizeObserver.disconnect()
      }
    }
    this.node = node

    if (this.props.containerRef) {
      this.props.containerRef(node)
    }
  }

  measure = (force) => {
    if (this.node) {
      const rect = this.node.getBoundingClientRect()
      const contentRect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        fromRight: window.innerWidth - rect.right,
        fromBottom: window.innerHeight - rect.bottom,
      }
      if (force || !equals(contentRect, this.contentRect)) {
        this.contentRect = contentRect
        if (this.props.onChange) {
          this.props.onChange(contentRect)
        }
      }
    }
  }

  addListeners() {
    this.events.forEach((event) => {
      if (event !== 'scroll' || this.props.listenScroll) {
        window.addEventListener(event, this.onEvent, event === 'scroll')
      }
    })
    if (this.node && this.resizeObserver) {
      this.resizeObserver.observe(this.node)
    }
  }

  removeListeners() {
    this.events.forEach(event => window.removeEventListener(event, this.onEvent, event === 'scroll'))
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  events = [
    'resize',
    'scroll',
    'pageshow',
    'load',
  ]

  render() {
    const props = omit(['element', 'containerRef', 'onChange', 'onResize', 'active', 'listenScroll'], this.props)
    const Element = this.props.element || 'div'
    return (
      <Element ref={this.setRef} {...props} />
    )
  }
}

export default FixedContainer
