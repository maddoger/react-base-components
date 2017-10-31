import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { equals } from 'ramda'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Dropdown from './dropdown'
import DropdownTrigger from './dropdown_trigger'
import DropdownContent from './dropdown_content'
import Toggle from './toggle'
import Icon from './icon'
import IconButton from './icon_button'
import FixedContainer from './fixed_container'

const SortableListItem = SortableElement(({ item, onShowChange }) => (
  <label htmlFor={`data-table-${item.key}`} className="toggle-list_item -dropdown">
    <span className="toggle-list_sort">
      <Icon icon="sort_handle" className="toggle-list_sort-handle" />
    </span>
    <span className="toggle-list_label">{item.title}</span>
    <Toggle
      id={`data-table-${item.key}`}
      className="toggle-list_toggle"
      onChange={onShowChange}
      checked={item.show}
    />
  </label>
))

const SortableList = SortableContainer(({ items, onShowChange }) => (
  <div className="toggle-list -dropdown -no-wrap">
    {items.map((item, key) => (
      <SortableListItem key={item.key} index={key} item={item} onShowChange={onShowChange.bind(null, item)} />
    ))}
  </div>
))

class DataTableColumns extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    onSortEnd: PropTypes.func.isRequired,
  }

  static contextTypes = {
    getContentRef: PropTypes.func,
  }

  state = {
    fixedStyles: {},
    floating: false,
    placeholderStyles: {},
  }

  onChange = (position) => {
    const contentRef = this.context.getContentRef()
    const { dropdownRef } = this
    if (dropdownRef && contentRef) {
      const contentRect = contentRef.getBoundingClientRect()
      const fixedStyles = { position: 'fixed' }
      const placeholderStyles = { height: dropdownRef.offsetHeight }
      const scrollbarWidth = (contentRef.offsetWidth - contentRef.clientWidth)
      const maxRight = contentRect.right - scrollbarWidth

      fixedStyles.right = window.innerWidth - (position.right < maxRight ? position.right : maxRight)
      fixedStyles.top = position.top > contentRect.top ? position.top : contentRect.top
      const floating = position.right >= maxRight

      if (!equals(fixedStyles, this.state.fixedStyles)) {
        this.setState({
          fixedStyles,
          placeholderStyles,
          floating,
        })
      }
    }
  }

  onShowChange = (item, checked) => {
    this.props.onChange(item.key, { show: checked })
  }

  setDropdownRef = (ref) => {
    this.dropdownRef = ref
  }

  render() {
    const { className, columns, onSortEnd } = this.props
    const { fixedStyles, placeholderStyles, floating } = this.state
    return (
      <FixedContainer className="data-table-columns" onChange={this.onChange}>
        <div className="data-table-columns_placeholder" style={placeholderStyles} />
        <Dropdown className={cn('data-table-columns_dropdown', className)}
          containerRef={this.setDropdownRef} style={fixedStyles}>
          <DropdownTrigger returnChildren
            className={cn('data-table-columns_trigger', { '-floating': floating })}>
            <IconButton icon="gear_small" preset="dropdown-trigger" />
          </DropdownTrigger>
          <DropdownContent className="data-table-columns_content" position={['downFromBottom', 'leftFromRight']}>
            <SortableList
              items={columns}
              onShowChange={this.onShowChange}
              onSortEnd={onSortEnd}
              distance={10}
              helperClass="-ghost"
              lockAxis="y"
              lockToContainerEdges
            />
          </DropdownContent>
        </Dropdown>
      </FixedContainer>
    )
  }
}

export default DataTableColumns
