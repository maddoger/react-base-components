import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FixedContainer from './fixed_container'

class FixedHeader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    zIndex: PropTypes.number,
  }

  state = {
    placeholderStyle: {},
    wrapperStyle: {},
  }

  onChange = (rect) => {
    const { placeholderRef, wrapperRef } = this
    const placeholderStyle = {
      height: wrapperRef.offsetHeight,
    }

    const placeholderWidth = placeholderRef.offsetWidth
    const maxWidth = placeholderWidth + (rect.width - placeholderWidth) / 2 // + right padding
    const overflow = wrapperRef.scrollWidth > maxWidth

    const wrapperStyle = {
      width: overflow ? maxWidth : placeholderWidth,
      overflow: overflow ? 'hidden' : 'visible',
      position: 'fixed',
      top: rect.top + 'px',
      zIndex: this.props.zIndex || 10,
    }

    this.setState({
      placeholderStyle,
      wrapperStyle,
    })
  }

  setPlaceholderRef = (ref) => {
    this.placeholderRef = ref
  }

  setWrapperRef = (ref) => {
    this.wrapperRef = ref
  }

  render() {
    const { className, children } = this.props
    const { placeholderStyle, wrapperStyle } = this.state
    return (
      <FixedContainer onChange={this.onChange} className={className}>
        <div ref={this.setPlaceholderRef} style={placeholderStyle} />
        <div ref={this.setWrapperRef} style={wrapperStyle}>
          {children}
        </div>
      </FixedContainer>
    )
  }
}

export default FixedHeader
