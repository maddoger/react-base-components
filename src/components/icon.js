import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable global-require */
export const ICONS = {
  // calendar: { width: 21, height: 20, svg: require('../icons/calendar.svg') },
}
/* eslint-enable global-require */

const Icon = ({ icon, className, width, height, ...rest }) => {
  if (!ICONS[icon]) {
    // console.warning(`Icon \`${icon}\` no found.`)
    return null
  }
  const info = ICONS[icon]
  const props = {
    className,
    width: width || info.width,
    height: height || info.height,
    viewBox: info.svg.default.viewBox,
    ...rest,
  }
  return (
    <svg {...props}>
      <use xlinkHref={`#${info.svg.default.id}`} />
    </svg>
  )
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Icon
