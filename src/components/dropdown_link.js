import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ButtonBase from './button_base'

const DropdownLink = ({ className, ...props }) => (
  <ButtonBase className={cn('dropdown_link', className)} {...props} />
)

DropdownLink.isDropdownItem = true
DropdownLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default DropdownLink
