import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Icon from './icon'
import IconButton from './icon_button'

class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    close: PropTypes.bool,
  }

  static defaultProps = {
    close: true,
  }

  render() {
    const { className, children, show, close, onClose } = this.props
    return (
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        appear
        timeout={400}
        classNames=""
      >
        <div className="modal">
          <div className="modal_backdrop" onClick={onClose} tabIndex={-1} role="button" />
          <div className={cn('modal_dialog', className)} role="dialog">
            {close && <IconButton onClick={onClose} className="modal_close" icon="close_small" />}
            {children}
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Modal
