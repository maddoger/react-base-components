import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const ButtonToolbar = ({ className, buttonClassName, children, vertical, block, equal }) => {
  const classes = cn({
    'button-toolbar': true,
    [className]: !!className,
    '-vertical': vertical,
    '-block': block,
    '-equal': equal,
  })

  return (
    <div className={classes} role="toolbar">
      {React.Children.map(children, child => (
        React.cloneElement(child, { className: cn(child.props.className, 'button-toolbar_button', buttonClassName) })
      ))}
    </div>
  )
}

ButtonToolbar.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool,
  equal: PropTypes.bool,
  block: PropTypes.bool,
}

export default ButtonToolbar
