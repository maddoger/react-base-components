import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Loader from './loader'

const LoadingContainer = ({ className, children, loading, hide, flex }) => (
  <div className={cn('loading-container', { '-flex': flex }, className)}>
    {!loading || !hide ? <div className="loading-container_content">{children}</div> : null}
    {loading ? <div className="loading-container_overlay"><Loader /></div> : null}
  </div>
)

LoadingContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  hide: PropTypes.bool,
  flex: PropTypes.bool,
}

LoadingContainer.defaultProps = {
  loading: false,
  hide: false,
}

export default LoadingContainer
