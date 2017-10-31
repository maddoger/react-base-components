import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { filter, propEq, equals, merge, forEachObjIndexed, has, find } from 'ramda'
import { arrayMove } from 'react-sortable-hoc'

import DataTableColumns from './data_table_columns'
import DataTableHead from './data_table_head'
import Loader from './loader'
import DataTableBody from './data_table_body'
import FixedContainer from './fixed_container'
import LoadMore from './load_more'

class DataTable extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tableClassName: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      // Key for value
      key: PropTypes.string.isRequired,
      // Attribute key or function for getting value (node) from item
      attribute: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      format: PropTypes.func, // formatting of value
      className: PropTypes.string,
      title: PropTypes.string, // String hint for col
      head: PropTypes.node, // Head content for col, if null title will be used
      show: PropTypes.bool,
      sortable: PropTypes.bool,
      noWrap: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 100 (px) or 10%
      align: PropTypes.oneOf(['left', 'right', 'center']),
      verticalAlign: PropTypes.oneOf(['top', 'bottom', 'center']),
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      // Attributes
      key: PropTypes.any,
      className: PropTypes.string,
    })),
    loading: PropTypes.bool,
    selectable: PropTypes.bool,
    configurable: PropTypes.bool,
    scrollable: PropTypes.bool,
    sort: PropTypes.arrayOf(PropTypes.array),
    onSortRequest: PropTypes.func,
    onItemClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
  }

  static defaultProps = {
    selectable: false,
    configurable: true,
    scrollable: true,
  }

  static contextTypes = {
    getContentRef: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this.fixedHeaderStyle = {}
    this.state = {
      columns: props.columns,
    }
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.columns, this.props.columns)) {
      this.setState({
        columns: nextProps.columns,
      })
    }
    this.fireResizeEvent()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  onColumnChange = (key, update) => {
    this.setState({
      columns: this.state.columns.map(item => (item.key === key ? merge(item, update) : item)),
    }, () => {
      const column = find(propEq('key', key), this.state.columns)
      if (column.switchColumn && has('show', update)) {
        column.switchColumn(update.show)
      }
      // Fire resize event after table width change
      this.fireResizeEvent()
    })
  }

  onColumnSort = ({ oldIndex, newIndex }) => {
    this.setState({
      columns: arrayMove(this.state.columns, oldIndex, newIndex),
    })
  }

  onPositionChange = () => {
    const contentRef = this.context.getContentRef()
    const { theadRef, fixedContainerRef } = this
    if (contentRef && fixedContainerRef) {
      const tableHeadRect = theadRef.getBoundingClientRect()
      const contentRect = contentRef.getBoundingClientRect()

      const fixedHeaderStyle = {
        position: '',
        top: '',
        left: '',
        width: '',
        height: '',
        display: '',
      }
      const fixed = tableHeadRect.top < contentRect.top && tableHeadRect.bottom < contentRect.bottom
      if (fixed) {
        fixedHeaderStyle.position = 'fixed'
        fixedHeaderStyle.top = contentRect.top + 'px'
        fixedHeaderStyle.left = tableHeadRect.left + 'px'
        const maxWidth = contentRect.right - tableHeadRect.left - (contentRef.offsetWidth - contentRef.clientWidth)
        fixedHeaderStyle.width = Math.min(maxWidth, tableHeadRect.width) + 'px'
        fixedHeaderStyle.height = 'auto'
      }
      if (!equals(fixedHeaderStyle, this.fixedHeaderStyle)) {
        this.fixedHeaderStyle = fixedHeaderStyle
        forEachObjIndexed((value, attr) => {
          fixedContainerRef.style[attr] = value
        }, fixedHeaderStyle)
      }
    }
  }

  onResize = () => {
    const { theadRef, fixedTheadRef } = this
    fixedTheadRef.parentNode.style.width = theadRef.parentNode.offsetWidth + 'px'
    const row = theadRef.firstChild
    const fixedRow = fixedTheadRef.firstChild
    for (let i = 0; i < row.children.length; i += 1) {
      fixedRow.children[i].style.width = row.children[i].clientWidth + 'px'
    }
  }

  setTheadRef = (ref) => {
    this.theadRef = ref
  }

  setFixedTheadRef = (ref) => {
    this.fixedTheadRef = ref
  }

  setFixedContainerRef = (ref) => {
    this.fixedContainerRef = ref
  }

  fireResizeEvent() {
    setTimeout(() => {
      const event = new Event('resize')
      window.dispatchEvent(event)
    }, 0)
  }

  render() {
    const {
      className, tableClassName, sort, data, loading, configurable, onLoadMore, hasMore,
    } = this.props
    const { columns } = this.state
    const processedColumns = filter(propEq('show', true), columns)
    const headProps = {
      columns: processedColumns,
      sort,
      onSortRequest: this.props.onSortRequest,
    }

    return (
      <FixedContainer onChange={this.onPositionChange} className={cn('data-table', className)}>
        {configurable &&
          <DataTableColumns columns={columns} onChange={this.onColumnChange} onSortEnd={this.onColumnSort} />}
        <div className="data-table_fixed-container" ref={this.setFixedContainerRef}>
          <table className={cn('data-table_table', tableClassName, '-fixed')}>
            <DataTableHead {...headProps} theadRef={this.setFixedTheadRef} />
          </table>
        </div>
        <div className="data-table_table-container">
          <table className={cn('data-table_table', tableClassName)}>
            <DataTableHead {...headProps} theadRef={this.setTheadRef} />
            <DataTableBody columns={processedColumns} data={data} onItemClick={this.props.onItemClick} />
          </table>
        </div>
        {loading && <div className="data-table_loading-overlay"><Loader className="data-table_loader" /></div>}
        {hasMore && <div className="data-table_load-more-container">
          <LoadMore className="data-table_load-more" onClick={onLoadMore} />
        </div>}
      </FixedContainer>
    )
  }
}

export default DataTable
