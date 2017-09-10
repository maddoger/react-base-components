import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'ramda'

function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true
  }
  // SVG <use/> elements do not technically reside in the rendered DOM, so
  // they do not have classList directly, but they offer a link to their
  // corresponding element, which can have classList. This extra check is for
  // that case.
  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass)
  }
  return current.classList.contains(ignoreClass)
}

function findHighestNode(currentNode, componentNode, ignoreClass) {
  if (currentNode === componentNode) {
    return true
  }
  let current = currentNode
  // If source=local then this event came from 'somewhere'
  // inside and should be ignored. We could handle this with
  // a layered approach, too, but that requires going back to
  // thinking in terms of Dom node nesting, running counter
  // to React's 'you shouldn't care about the DOM' philosophy.
  while (current.parentNode) {
    if (isNodeFound(current, componentNode, ignoreClass)) {
      return true
    }
    current = current.parentNode
  }
  return current
}

/**
 * Component that alerts if you click outside of it
 */
class ClickOutside extends PureComponent {
  static propTypes = {
    element: PropTypes.string.isRequired,
    ignoreClass: PropTypes.string,
    onClickOutside: PropTypes.func.isRequired,
    active: PropTypes.bool,
    containerRef: PropTypes.func,
  }

  static defaultProps = {
    element: 'div',
    // ignoreClass: 'ignore-click-outside',
    active: true,
  }

  componentDidMount() {
    if (this.props.active) {
      this.addEventListener()
    }
  }

  componentWillReceiveProps({ active }) {
    if (active !== undefined) {
      if (this.props.active && !active) {
        this.removeEventListener()
      } else if (!this.props.active && active) {
        this.addEventListener()
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      this.removeEventListener()
    }
  }

  setRef = (ref) => {
    const { containerRef } = this.props
    this.containerRef = ref
    if (containerRef) {
      containerRef(ref)
    }
  }

  handleClickOutside = (event) => {
    const { ignoreClass, onClickOutside } = this.props
    if (this.containerRef && onClickOutside) {
      if (ignoreClass) {
        if (findHighestNode(event.target, this.containerRef, ignoreClass) !== document) {
          return
        }
      } else if (this.containerRef.contains(event.target)) {
        return
      }
      onClickOutside(event)
    }
  }

  addEventListener() {
    document.addEventListener('mousedown', this.handleClickOutside, true)
  }

  removeEventListener() {
    document.removeEventListener('mousedown', this.handleClickOutside, true)
  }

  render() {
    const props = omit(['element', 'ignoreClass', 'onClickOutside', 'active', 'containerRef'], this.props)
    const Element = this.props.element
    return <Element ref={this.setRef} {...props} />
  }
}

export default ClickOutside
