import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'
import IconButton from './icon_button'

class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    closable: PropTypes.bool,
  }

  static defaultProps = {
    close: true,
    closable: true,
  }

  render() {
    const { className, children, show, closable, onClose } = this.props
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
          <div className="modal_backdrop" onClick={closable && onClose} tabIndex={-1} role="button" />
          <div className={cn('modal_dialog', className)} role="dialog">
            {closable && <IconButton onClick={onClose} className="modal_close" icon="close_small" />}
            {children}
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Modal
