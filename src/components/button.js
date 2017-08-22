import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ButtonBase from './button_base'

const Button = (props) => {
  const {
    className,
    children,
    preset,
    block,
    icon,
    ...rest
  } = props

  const resultClassName = cn({
    button: true,
    [className]: !!className,
    '-block': block,
    [`-preset-${preset}`]: !!preset,
  })

  return (
    <ButtonBase className={resultClassName} {...rest}>
      <div className="button_container">
        {icon ? <div className="button_icon">{icon}</div> : null}
        <div className="button_content">{children}</div>
      </div>
    </ButtonBase>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  block: PropTypes.bool,
  preset: PropTypes.string,
  icon: PropTypes.node,
}

Button.defaultProps = {
  preset: 'primary-outline',
}

export default Button
