import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { is } from 'ramda'

class DataTableRow extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    columns: PropTypes.array,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
  }

  onClick = () => {
    const { onClick, item } = this.props
    if (onClick) {
      onClick(item)
    }
  }

  render() {
    const { item, columns, selected } = this.props
    const clickable = !!this.props.onClick

    const classes = cn('data-table_row', { '-selected': selected }, item.className)
    const cols = columns.map((col) => {
      const attribute = col.attribute
      let content
      if (is(Function, attribute)) {
        content = attribute(item, col)
      } else {
        content = item[attribute]
      }
      if (col.format) {
        content = col.format(content)
      }
      const tdClasses = cn('data-table_td', col.className, {
        '-no-wrap': col.noWrap,
        [`-align-${col.align}`]: !!col.align,
        [`-vertical-align-${col.verticalAlign}`]: !!col.verticalAlign,
      })

      return (
        <td key={col.key} className={tdClasses}>
          <div className="data-table_td-content">
            {content || '-'}
          </div>
        </td>
      )
    })
    return (
      <tr className={classes} onClick={clickable ? this.onClick : null} role={clickable && 'link'}>
        {cols}
      </tr>
    )
  }
}

export default DataTableRow
