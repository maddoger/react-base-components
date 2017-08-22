import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DropdownDelimiter from './dropdown_delimiter'
import DropdownLink from './dropdown_link'
import ClickOutside from './click_outside'

const DropdownTrigger = ({ className, children, active, onClick, returnChildren }) => {
  const childProps = {
    className: cn('dropdown_trigger', className, { '-active': active }),
    onClick,
  }
  if (returnChildren) {
    return React.cloneElement(children, childProps)
  }
  return <button type="button" {...childProps}>{children}</button>
}

DropdownTrigger.isDropdownTrigger = true
DropdownTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  returnChildren: PropTypes.bool,
}

export default DropdownTrigger

