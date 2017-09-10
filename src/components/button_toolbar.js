import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const ButtonToolbar = (props) => {
  const { className, buttonClassName, children, vertical, block, equal, stick, wrap } = props
  const classes = cn({
    'button-toolbar': true,
    [className]: !!className,
    '-vertical': vertical,
    '-block': block,
    '-equal': equal,
    '-stick': stick,
    '-wrap': wrap,
  })

  return (
    <div className={classes} role="toolbar">
      {React.Children.map(children, child => (
        child &&
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
  stick: PropTypes.bool,
  wrap: PropTypes.bool,
}

export default ButtonToolbar
