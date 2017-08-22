import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './form_group'
import TextInput from './text_input'

const TextField = (props) => {
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
  const textInputProps = {
    className: props.inputClassName,
    name: props.name,
    type: props.type,
    hasError: !!props.error,
    required: props.required,
    disabled: props.disabled,
    value: props.value,
    defaultValue: props.defaultValue,
    placeholder: props.placeholder,
    onChange: props.onChange,
    onPressEnter: props.onPressEnter,
    rows: props.rows,
    size: props.size,
    ...props.inputProps,
  }

  return (
    <FormGroup {...formGroupProps}>
      <TextInput {...textInputProps} />
    </FormGroup>
  )
}

TextField.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  hint: PropTypes.node,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  inputProps: PropTypes.object,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

export default TextField
