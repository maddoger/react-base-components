import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class ProgressBar extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    vertical: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    animate: PropTypes.bool,
  }

  static defaultProps = {
    baseClassName: 'progress-bar',
    number: 0,
    animate: false,
  }

  render() {
    const { className, value, vertical, color, size, animate } = this.props
    let baseClassName = this.props.baseClassName || 'progress-bar'
    const progressStyle = {}
    if (vertical) {
      baseClassName += '-vertical'
      progressStyle.height = (Math.min(1, value) * 100) + '%'
    } else {
      baseClassName += '-horizontal'
      progressStyle.width = (Math.min(1, value) * 100) + '%'
    }
    if (color) {
      progressStyle.backgroundColor = color
    }
    return (
      <div className={cn(baseClassName, className, { [`-size-${size}`]: size, '-animate': animate })}>
        <div className={baseClassName + '_progress'} style={progressStyle} />
      </div>
    )
  }
}

export default ProgressBar
