import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Checkbox from './checkbox'
import FormGroup from './form_group'

const CheckboxField = (props) => {
  const formGroupProps = {
    error: props.error,
    hint: props.hint,
    required: props.required,
    disabled: props.disabled,
    className: cn('-checkbox', props.className),
    size: props.size,
  }
  const checkboxProps = {
    id: props.id,
    className: props.inputClassName,
    name: props.name,
    hasError: !!props.error,
    required: props.required,
    disabled: props.disabled,
    value: props.value,
    checked: props.checked,
    onChange: props.onChange,
    size: props.size,
    label: props.label,
  }

  return (
    <FormGroup {...formGroupProps}>
      <Checkbox {...checkboxProps} />
    </FormGroup>
  )
}

CheckboxField.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  hint: PropTypes.node,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.string,
}

export default CheckboxField
