import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { t } from '../i18n'

class ListEmpty extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
  }

  render() {
    const { className, message = t('Nothing found') } = this.props
    return (
      <div className={cn('list-empty', className)}>
        <div className="list-empty_container">
          <span className="list-empty_line" />
          <span className="list-empty_message">{message}</span>
          <span className="list-empty_line" />
        </div>
      </div>
    )
  }
}

export default ListEmpty
