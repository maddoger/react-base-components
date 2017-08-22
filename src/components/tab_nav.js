import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const TabNav = ({ className, children }) => (
  <div className={cn('tab-nav', className)}>{children}</div>
)

TabNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default TabNav
