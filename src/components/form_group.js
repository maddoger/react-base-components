import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class FormGroup extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.node,
    labelFor: PropTypes.string,
    labelClassName: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.bool]),
    errorClassName: PropTypes.string,
    hint: PropTypes.node,
    hintClassName: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    focus: PropTypes.bool,
    size: PropTypes.string,
  }

  renderLabel() {
    const {
      label,
      labelFor,
      labelClassName,
      required,
    } = this.props
    if (!label) {
      return null
    }
    const Element = 'label'
    return (
      <Element className={cn('form-group_label', labelClassName)} htmlFor={labelFor}>
        {label}
        {required ? <abbr className="form-group_required-astrix">*</abbr> : null}
      </Element>
    )
  }

  renderError() {
    const {
      error,
      errorClassName,
    } = this.props
    if (!error) {
      return null
    }
    return React.Children.map(error, item => <div className={cn('form-group_error', errorClassName)}>{item}</div>)
  }

  renderHint() {
    const {
      hint,
      hintClassName,
    } = this.props
    if (!hint) {
      return null
    }
    return (
      <div className={cn('form-group_hint', hintClassName)}>
        {hint}
      </div>
    )
  }

  render() {
    const {
      className,
      required,
      disabled,
      children,
      error,
      focus,
      size,
    } = this.props
    return (
      <div
        className={cn({
          'form-group': true,
          [`-size-${size}`]: !!size,
          '-has-error': !!error,
          '-disabled': disabled,
          '-required': required,
          '-focus': focus,
          [className]: !!className,
        })}
      >
        {this.renderLabel()}
        <div className="form-group_control">
          {children}
        </div>
        {this.renderError()}
        {this.renderHint()}
      </div>
    )
  }
}

export default FormGroup
