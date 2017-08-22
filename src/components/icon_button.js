import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ButtonBase from './button_base'
import Icon from './icon'
import Loader from './loader'

const IconButton = ({ className, icon, width, height, iconClassName, loading, preset, ...rest }) => (
  <ButtonBase className={cn('icon-button', { [`-preset-${preset}`]: preset }, className)} loading={loading} {...rest}>
    <div className="icon-button_container">
      <Icon icon={icon} className={cn('icon-button_icon', iconClassName)} width={width} height={height} />
    </div>
    {loading ? <Loader className="icon-button_loader " /> : null}
  </ButtonBase>
)

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  iconProps: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
  preset: PropTypes.string,
  title: PropTypes.string,
}

export default IconButton
