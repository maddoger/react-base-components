import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from './icon'

const Loader = ({ className, icon = 'loader' }) => (
  <div className={cn('loader', className)}>
    <Icon icon={icon} className="loader_spinner" />
  </div>
)

Loader.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
}

export default Loader
