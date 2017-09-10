import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { mergeAll } from 'ramda'

import { t } from '../i18n'

import Modal from './modal'
import ButtonToolbar from './button_toolbar'
import Button from './button'

class ConfirmContext extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    confirm: PropTypes.func,
    alert: PropTypes.func,
  }

  state = { isOpen: false }

  getChildContext() {
    return { confirm: this.confirm, alert: this.alert }
  }

  defaultState = {
    className: null,
    cancelTitle: t('Cancel'),
    successTitle: t('Confirm'),
    successPreset: 'primary',
    title: t('Are you sure?'),
    message: null,
  }

  alertDefaultState = {
    className: 'alert',
    cancelTitle: null,
    successTitle: t('Ok, got it'),
    successPreset: 'primary-outline',
  }

  cancel = () => { this.setState(() => ({ isOpen: false }), this.state.reject) }
  success = () => { this.setState(() => ({ isOpen: false }), this.state.resolve) }

  confirm = opts =>
    new Promise((resolve, reject) =>
      this.setState(mergeAll([this.defaultState, opts, { isOpen: true, resolve, reject }])))

  alert = opts =>
    new Promise((resolve, reject) =>
      this.setState(mergeAll([this.defaultState, this.alertDefaultState, opts, { isOpen: true, resolve, reject }])))

  render() {
    const { className, isOpen, title, message, successTitle, successPreset, cancelTitle } = this.state
    return (
      <div>
        <Modal className={cn('confirm-modal', className)} show={isOpen} onClose={this.cancel} closeable={false}>
          {title && <div className="confirm-modal_title">{title}</div>}
          {message && <div className="confirm-modal_question">{message}</div>}
          <div className="confirm-modal_actions">
            <ButtonToolbar block equal className="confirm-modal_toolbar">
              {cancelTitle && <Button preset="primary-outline" block onClick={this.cancel}>{cancelTitle}</Button>}
              {successTitle && <Button preset={successPreset} block onClick={this.success}>{successTitle}</Button>}
            </ButtonToolbar>
          </div>
        </Modal>
        {this.props.children}
      </div>
    )
  }
}

export default ConfirmContext
