import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import Loader from './loader'

const LoadingContainer = ({ className, children, loading, hide, flex }) => (
  <div className={cn('loading-container', { '-loading': loading, '-flex': flex }, className)}>
    {!loading || !hide ? <div className="loading-container_content">{children}</div> : null}
    <CSSTransition
      in={loading}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="">
      <div className="loading-container_overlay">
        <Loader />
      </div>
    </CSSTransition>
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
