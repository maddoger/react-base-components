import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ButtonBase from './button_base'
import Icon from './icon'

const Button = (props) => {
  const {
    className,
    children,
    preset,
    block,
    icon,
    size,
    align,
    ...rest
  } = props

  const resultClassName = cn({
    'button': true,
    [className]: !!className,
    '-block': block,
    [`-align-${align}`]: !!align,
    [`-preset-${preset}`]: !!preset,
    [`-size-${size}`]: !!size,
  })

  return (
    <ButtonBase className={resultClassName} {...rest}>
      <span className="button_container">
        {icon && <span className="button_icon-container"><Icon icon={icon} className="button_icon" /></span>}
        <span className="button_content">{children}</span>
      </span>
    </ButtonBase>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  block: PropTypes.bool,
  preset: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  icon: PropTypes.string,
  to: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  preset: 'primary-outline',
}

export default Button
