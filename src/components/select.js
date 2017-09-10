import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ReactSelect from 'react-select'
import { filter, merge, pluck } from 'ramda'

import { t } from '../i18n'
import Icon from './icon'

class Select extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hasError: PropTypes.bool,
    size: PropTypes.string,
    renderOption: PropTypes.func,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    loading: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    inputRef: PropTypes.func,
  }

  static defaultProps = {
    clearable: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      hasFocus: false,
    }
  }

  handleChange = (value) => {
    const { onChange, multiple } = this.props
    if (onChange) {
      if (multiple) {
        onChange(pluck('value', value))
      } else {
        onChange(value ? value.value : '')
      }
    }
  }

  handleFocus = (e) => {
    this.setState({
      hasFocus: true,
    })
    const { onFocus } = this.props
    if (onFocus) {
      onFocus(e)
    }
  }

  handleBlur = (e) => {
    this.setState({
      hasFocus: false,
    })
    const { onBlur } = this.props
    if (onBlur) {
      onBlur(e)
    }
  }

  renderArrow = ({ isOpen }) => (
    <Icon icon="chevron_select" className={cn('Select-arrow-icon', isOpen && '-open')} />
  )

  render() {
    const {
      id,
      className,
      disabled,
      required,
      hasError,
      size,
      multiple,
      options,
      inputRef,
      ...rest
    } = this.props

    const {
      hasFocus,
    } = this.state

    const searchable = this.props.searchable !== undefined ? Select.propTypes.searchable :
      (options && options.length > 10)

    const selectProps = merge(rest, {
      id,
      className: cn({
        '-disabled': disabled,
        '-required': required,
        '-has-error': hasError,
        '-focus': hasFocus,
        [`-size-${size}`]: !!size,
        [className]: !!className,
      }),
      arrowRenderer: this.renderArrow,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      options,
      multi: multiple,
      searchable,
      clearValueText: t('Clear'),
      clearAllText: t('Clear all'),
      noResultsText: t('No results found'),
      searchPromptText: t('Type to search'),
      addLabelText: t('Add {label}?'),
      placeholder: t('Select...'),
      loadingPlaceholder: t('Loading...'),
      ref: inputRef,
    })

    const { value } = this.props
    if (multiple && value) {
      selectProps.value = filter(item => (value.indexOf(item.value) > -1), options)
    }

    return (
      <ReactSelect {...selectProps} />
    )
  }
}

export default Select
