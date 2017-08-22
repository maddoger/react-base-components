import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './form_group'
import Select from './select'

const SelectField = (props) => {
  const formGroupProps = {
    label: props.label,
    labelFor: props.id,
    error: props.error,
    hint: props.hint,
    required: props.required,
    disabled: props.disabled,
    className: props.className,
    size: props.size,
  }
  const selectProps = {
    id: props.id,
    className: props.inputClassName,
    name: props.name,
    hasError: !!props.error,
    required: props.required,
    disabled: props.disabled,
    focus: props.focus,
    value: props.value,
    defaultValue: props.defaultValue,
    placeholder: props.placeholder,
    onChange: props.onChange,
    items: props.items,
    renderOption: props.renderOption,
    size: props.size,
  }
  selectProps.className = props.inputClassName

  return (
    <FormGroup {...formGroupProps}>
      <Select {...selectProps} />
    </FormGroup>
  )
}

SelectField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  hint: PropTypes.node,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
  renderOption: PropTypes.func,
}

export default SelectField
