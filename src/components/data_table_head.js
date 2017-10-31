import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { find, propEq, propOr } from 'ramda'
import Icon from './icon'

class DataTableHead extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array.isRequired,
    sort: PropTypes.array,
    theadRef: PropTypes.func,
    onSortRequest: PropTypes.func,
  }

  render() {
    const { className, sort, columns, onSortRequest, theadRef } = this.props
    const cols = columns.map((item, index) => {
      const colSort = sort && propOr(null, 1, find(propEq(0, item.key), sort))
      const sortable = onSortRequest && item.sortable
      const configurable = columns.length === index + 1

      const thClasses = cn('data-table_th', item.className, {
        '-no-wrap': item.noWrap,
        [`-align-${item.align}`]: !!item.align,
        [`-vertical-align-${item.verticalAlign}`]: !!item.verticalAlign,
      })
      const contentProps = {
        className: cn('data-table_th-content', { '-configurable': configurable }),
      }
      const titleProps = {
        className: cn('data-table_th-title', { '-sort': colSort }),
        role: sortable ? 'link' : null,
        onClick: sortable ? onSortRequest.bind(null, item, colSort) : null,
        tabIndex: sortable ? 0 : null,
      }
      return (
        <th key={item.key} className={thClasses} style={{ minWidth: `${item.width}px` }}>
          <div {...contentProps}>
            <span {...titleProps}>
              {item.head || item.title || item.key}
              {colSort && (
                <span className={`data-table_th-sort -${colSort}`}>
                  <Icon className={`data-table_th-sort-icon -${colSort}`} icon="chevron_select" />
                </span>
              )}
            </span>
          </div>
        </th>
      )
    })
    return (
      <thead className={cn('data-table_thead', className)} ref={theadRef}>
        <tr className="data-table_row">{cols}</tr>
      </thead>
    )
  }
}

export default DataTableHead
