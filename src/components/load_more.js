import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { omit } from 'ramda'

import { t } from '../i18n'
import Button from './button'

class LoadMore extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    block: PropTypes.bool,
  }

  render() {
    const { className, children } = this.props
    const rest = omit(['className', 'children', 'hasMore'], this.props)
    return (
      <Button preset="transparent" className={cn('load-more', className)} {...rest}>
        {children || t('Load More')}
      </Button>
    )
  }
}

export default LoadMore
