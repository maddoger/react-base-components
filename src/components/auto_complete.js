import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { t } from '../i18n'

import TextInput from './text_input'
import DropdownContent from './dropdown_content'
import DropdownLink from './dropdown_link'
import Icon from './icon'
import LoadingContainer from './loading_container'

class AutoComplete extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    inputProps: PropTypes.object,
    loading: PropTypes.bool,
    items: PropTypes.array,
    renderItem: PropTypes.func,
    getItemValue: PropTypes.func, // required if item is object
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    size: PropTypes.string,
    clearOnClose: PropTypes.bool,
  }

  static defaultProps = {
    inputProps: {},
    items: [],
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      value: props.value || '',
      open: false,
      highlightedIndex: -1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onChange = (value, e) => {
    if (!this.state.open) {
      this.open()
    }
    this.props.onChange(value, e)
  }

  onFocus = (e) => {
    this.open()
    const { onFocus } = this.props
    if (onFocus) {
      e.persist()
      onFocus(e)
    }
  }

  onBlur = (e) => {
    this.close()
    const { onBlur } = this.props
    if (onBlur) {
      e.persist()
      onBlur(e)
    }
  }

  onItemHover = (index) => {
    this.setState({
      highlightedIndex: index,
    })
  }

  onKeyDown = (e) => {
    const { items } = this.props
    const { highlightedIndex, open } = this.state

    if (e.keyCode === 40) { // down
      const newIndex = (highlightedIndex >= items.length - 1) ? 0 : highlightedIndex + 1
      if (open) {
        this.setState({
          highlightedIndex: newIndex,
          value: this.getItemValue(items[newIndex]),
        })
      } else {
        this.open()
      }
    } else if (e.keyCode === 38) { // up
      const newIndex = highlightedIndex <= 0 ? (items.length - 1) : highlightedIndex - 1
      this.setState({
        highlightedIndex: newIndex,
        value: this.getItemValue(items[newIndex]),
      })
    } else if (e.keyCode === 27) { // esc
      this.close(true)
    } else if (e.keyCode === 13) { // enter
      e.preventDefault()
      e.stopPropagation()
      this.close()
      this.onSelect(highlightedIndex)
      return
    } else if (!open) {
      this.open()
    }

    const { onKeyDown } = this.props
    if (onKeyDown) {
      e.persist()
      onKeyDown(e)
    }
  }

  onSelect = (index) => {
    const { items, onChange, onSelect } = this.props
    if (index !== -1) {
      const value = this.getItemValue(items[index])
      if (onSelect) {
        if (!onSelect(value, items[index])) {
          return
        }
      }
      onChange(value)
    }
  }

  getItemValue(item) {
    if (this.props.getItemValue) {
      return this.props.getItemValue(item)
    }
    return item
  }

  setInputRef = (ref) => {
    this.inputRef = ref
  }

  open = () => {
    this.setState({ open: true, highlightedIndex: -1 })
  }

  close = (resetValue) => {
    const { clearOnClose, onChange } = this.props
    let value
    if (clearOnClose) {
      value = ''
    } else {
      value = resetValue ? this.props.value || '' : this.state.value
    }
    this.setState({
      open: false,
      highlightedIndex: -1,
      value,
    }, () => {
      if (onChange) {
        onChange(value)
      }
    })
  }

  renderInput() {
    const { open, value } = this.state
    const props = {
      'size': this.props.size,
      ...this.props.inputProps,
      'inputRef': this.setInputRef,
      value,
      'onChange': this.onChange,
      'onFocus': this.onFocus,
      'onBlur': this.onBlur,
      'onKeyDown': this.onKeyDown,
      'className': cn('auto-complete_text-input', this.props.inputProps.className),
      'role': 'combobox',
      'aria-autocomplete': 'list',
      'aria-haspopup': open,
      'aria-expanded': open,
    }
    return <TextInput {...props} />
  }

  renderDropdown() {
    const { renderItem, items, loading } = this.props
    const { open, highlightedIndex } = this.state
    return (
      <DropdownContent open={open} className="auto-complete_list">
        <LoadingContainer className="auto-complete_loading-container" loading={loading} hide>
          {(items && items.length > 0) ? items.map((item, key) => (
            <DropdownLink
              key={item.key || item.id || key}
              className={cn('auto-complete_item -wrap', { '-highlighted': key === highlightedIndex })}
              onClick={this.onSelect.bind(null, key)}
              onMouseEnter={this.onItemHover.bind(null, key)}
            >
              {renderItem ? renderItem(item, key === highlightedIndex) : item}
            </DropdownLink>
          )) : (
            <div className="auto-complete_not-found">
              <Icon icon="search_big" className="auto-complete_not-found-icon" />
              <div className="auto-complete_not-found-text">
                {t('Nothing Found')}
              </div>
            </div>
          )}
        </LoadingContainer>
      </DropdownContent>
    )
  }

  render() {
    const { className, size } = this.props
    return (
      <div className={cn('auto-complete', size && `-size-${size}`, className)}>
        {this.renderInput()}
        {this.renderDropdown()}
      </div>
    )
  }
}

export default AutoComplete
