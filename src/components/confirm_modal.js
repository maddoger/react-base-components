import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { t } from '../i18n'

import Modal from './modal'
import ButtonToolbar from './button_toolbar'
import Button from './button'

export default class ConfirmModal extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  render() {
    const { children, show, onCancel, onOk } = this.props
    return (
      <Modal className="confirm-modal" show={show} onClose={onCancel}>
        <div className="confirm-modal_question">
          {children}
        </div>
        <div className="confirm-modal_actions">
          <ButtonToolbar equal>
            <Button preset="primary-outline" block onClick={onCancel}>{t('Cancel')}</Button>
            <Button preset="primary" block onClick={onOk}>{t('Confirm')}</Button>
          </ButtonToolbar>
        </div>
      </Modal>
    )
  }
}
