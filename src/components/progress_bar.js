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
  }

  static defaultProps = {
    baseClassName: 'progress-bar',
    number: 0,
  }

  render() {
    const { className, value, vertical, color } = this.props
    let baseClassName = this.props.baseClassName || 'progress-bar'
    const progressStyle = {}
    if (vertical) {
      baseClassName += '-vertical'
      progressStyle.height = (value * 100) + '%'
    } else {
      baseClassName += '-horizontal'
      progressStyle.width = (value * 100) + '%'
    }
    if (color) {
      progressStyle.backgroundColor = color
    }
    return (
      <div className={cn(baseClassName, className)}>
        <div className={baseClassName + '_progress'} style={progressStyle} />
      </div>
    )
  }
}

export default ProgressBar
