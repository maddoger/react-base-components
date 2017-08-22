import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const DropdownDelimiter = ({ className }) => (
  <div className={cn('dropdown_delimiter', className)} />
)
DropdownDelimiter.propTypes = {
  className: PropTypes.string,
}

export default DropdownDelimiter
