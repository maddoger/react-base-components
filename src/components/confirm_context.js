import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { mergeAll } from 'ramda'

import Modal from './modal'
import ButtonToolbar from './button_toolbar'
import Button from './button'

class ConfirmContext extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    confirm: PropTypes.func,
  }

  state = { isOpen: false }

  getChildContext() {
    return { confirm: this.confirm }
  }

  defaultState = {
    cancelTitle: this.props.t('Cancel'),
    successTitle: this.props.t('Confirm'),
  }

  cancel = () => { this.setState(() => ({ isOpen: false }), this.state.reject) }
  success = () => { this.setState(() => ({ isOpen: false }), this.state.resolve) }

  confirm = opts =>
    new Promise((resolve, reject) =>
      this.setState(mergeAll([this.defaultState, opts, { isOpen: true, resolve, reject }])))

  render() {
    return (
      <div>
        <Modal className="confirm-modal" show={this.state.isOpen} onClose={this.cancel}>
          <div className="confirm-modal_question">{this.state.message}</div>
          <div className="confirm-modal_actions">
            <ButtonToolbar block equal className="confirm-modal_toolbar">
              <Button preset="primary-outline" block onClick={this.cancel}>{this.state.cancelTitle}</Button>
              <Button preset="primary" block onClick={this.success}>{this.state.successTitle}</Button>
            </ButtonToolbar>
          </div>
        </Modal>
        {this.props.children}
      </div>
    )
  }
}

export default translate('app')(ConfirmContext)
