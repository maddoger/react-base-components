import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Loader = ({ className, size = 'med' }) => (
  <span className={cn('loader', `-size-${size}`, className)}>
    <svg width="50" height="50" viewBox="0 0 50 50" className="loader_svg">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" className="loader_circle" />
    </svg>
  </span>
)

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
}

export default Loader
