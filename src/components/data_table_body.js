import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DataTableRow from './data_table_row'

class DataTableBody extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    onItemClick: PropTypes.func,
  }

  render() {
    const { className, columns, data, onItemClick } = this.props
    const rows = data.map((item, key) => (
      <DataTableRow
        key={item.key || item.id || key}
        columns={columns}
        item={item}
        onClick={onItemClick} />
    ))
    return (<tbody className={cn('data-table_tbody', className)}>{rows}</tbody>)
  }
}

export default DataTableBody
