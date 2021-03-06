import React from 'react'
import PropTypes from 'prop-types'
import { is, mergeAll, omit } from 'ramda'

import FormGroup from './FormGroup'
import TextInput from './TextInput'
import Select from './Select'
import Checkbox from './Checkbox'
import Toggle from './Toggle'

const FormField = (props) => {
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
  const controlProps = mergeAll([
    {
      className: props.controlClassName,
      hasError: !!props.error,
    },
    omit([
      'controlClassName',
      'controlProps',
      'control',
      'label',
      'error',
      'hint',
      'className',
    ], props),
    props.controlProps,
  ])
  let Control = TextInput

  if (props.control) {
    if (is(String, props.control)) {
      switch (props.control) {
        case 'select':
          Control = Select
          break
        case 'checkbox':
          Control = Checkbox
          break
        case 'toggle':
          Control = Toggle
          break
        default:
      }
    } else {
      Control = props.control
    }
  }

  return (
    <FormGroup {...formGroupProps}>
      <Control {...controlProps} />
    </FormGroup>
  )
}

FormField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.bool]),
  hint: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  control: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  controlClassName: PropTypes.string,
  controlProps: PropTypes.object,
}

export default FormField
