import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const DropdownItem = ({ className, ...props }) => (
  <div className={cn('dropdown_item', className)} {...props} />
)

DropdownItem.isDropdownItem = true
DropdownItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default DropdownItem
