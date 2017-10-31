import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class Tab extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    eventKey: PropTypes.string,
    title: PropTypes.string,
    buttonProps: PropTypes.object,
  }

  render() {
    const { className, children } = this.props
    return <div className={cn(className)}>{children}</div>
  }
}

export default Tab
