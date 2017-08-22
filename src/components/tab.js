import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class Tab extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { className, children } = this.props
    return <div className={cn(className)}>{children}</div>
  }
}

export default Tab
