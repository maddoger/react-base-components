import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const DropdownContent = ({ className, children }) => (
  <div
    className={cn('dropdown_content', className)}
    role="dialog"
  >
    {children}
  </div>
)

DropdownContent.isDropdownContent = true
DropdownContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default DropdownContent

