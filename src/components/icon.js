import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable global-require */
const ICONS = {
  activity_med: { width: 22, height: 22, svg: require('../icons/activity_med.svg') },
  add_big: { width: 29, height: 29, svg: require('../icons/add_big.svg') },
  add_small: { width: 16, height: 16, svg: require('../icons/add_small.svg') },
  area_info_med: { width: 28, height: 27, svg: require('../icons/area_info_med.svg') },
  calendar_big: { width: 26, height: 25, svg: require('../icons/calendar_big.svg') },
  calendar_med: { width: 21, height: 20, svg: require('../icons/calendar_med.svg') },
  chat_big: { width: 26, height: 25, svg: require('../icons/chat_big.svg') },
  checkbox_check: { width: 10, height: 8, svg: require('../icons/checkbox_check.svg') },
  chevron_select: { width: 15, height: 10, svg: require('../icons/chevron_select.svg') },
  chevron_sidebar: { width: 7, height: 4, svg: require('../icons/chevron_sidebar.svg') },
  clock_med: { width: 22, height: 22, svg: require('../icons/clock_med.svg') },
  clock_small: { width: 16, height: 16, svg: require('../icons/clock_small.svg') },
  close_med: { width: 17.56, height: 17.56, svg: require('../icons/close_med.svg') },
  close_round: { width: 29, height: 29, svg: require('../icons/close_round.svg') },
  close_small: { width: 12, height: 12, svg: require('../icons/close_small.svg') },
  colorize_small: { width: 12, height: 17, svg: require('../icons/colorize_small.svg') },
  dashboard_big: { width: 22, height: 22, svg: require('../icons/dashboard_big.svg') },
  document_big: { width: 22, height: 28, svg: require('../icons/document_big.svg') },
  download_med: { width: 22, height: 21, svg: require('../icons/download_med.svg') },
  download_small: { width: 16, height: 16, svg: require('../icons/download_small.svg') },
  filter_big: { width: 22, height: 26, svg: require('../icons/filter_big.svg') },
  filter_small: { width: 15, height: 16, svg: require('../icons/filter_small.svg') },
  flag_med: { width: 18, height: 12, svg: require('../icons/flag_med.svg') },
  flag_small: { width: 14, height: 16, svg: require('../icons/flag_small.svg') },
  gear_big: { width: 28, height: 28, svg: require('../icons/gear_big.svg') },
  gear_med: { width: 22, height: 22, svg: require('../icons/gear_med.svg') },
  gear_small: { width: 16, height: 16, svg: require('../icons/gear_small.svg') },
  info_small: { width: 16, height: 16, svg: require('../icons/info_small.svg') },
  layers: { width: 16, height: 11, svg: require('../icons/layers.svg') },
  lead_machine_med: { width: 22, height: 22, svg: require('../icons/lead_machine_med.svg') },
  lead_pin: { width: 21, height: 29, svg: require('../icons/lead_pin.svg') },
  loader: { width: 250, height: 251, svg: require('../icons/loader.svg') },
  lock_small: { width: 15, height: 18, svg: require('../icons/lock_small.svg') },
  logo: { width: 774.896, height: 159.799, svg: require('../icons/logo.svg') },
  logo_pin: { width: 125, height: 160, svg: require('../icons/logo_pin.svg') },
  logo_text: { width: 585, height: 122, svg: require('../icons/logo_text.svg') },
  map_big: { width: 24, height: 32, svg: require('../icons/map_big.svg') },
  map_marker_info_pin: { width: 24, height: 29, svg: require('../icons/map_marker_info_pin.svg') },
  map_marker_info_user_pin: { width: 36, height: 45, svg: require('../icons/map_marker_info_user_pin.svg') },
  map_med: { width: 18, height: 24, svg: require('../icons/map_med.svg') },
  menu_med: { width: 20, height: 14, svg: require('../icons/menu_med.svg') },
  next_small: { width: 16, height: 16, svg: require('../icons/next_small.svg') },
  open_med: { width: 20, height: 20, svg: require('../icons/open_med.svg') },
  open_small: { width: 16, height: 16, svg: require('../icons/open_small.svg') },
  pencil: { width: 16, height: 16, svg: require('../icons/pencil.svg') },
  performance_med: { width: 22, height: 19, svg: require('../icons/performance _med.svg') },
  pie_chart_med: { width: 22, height: 22, svg: require('../icons/pie_chart_med.svg') },
  pie_chart_small: { width: 16, height: 16, svg: require('../icons/pie_chart_small.svg') },
  pin_med: { width: 18, height: 26, svg: require('../icons/pin_med.svg') },
  pin_small: { width: 12, height: 17, svg: require('../icons/pin_small.svg') },
  pipeline: { width: 22, height: 26, svg: require('../icons/pipeline.svg') },
  planet_med: { width: 22, height: 22, svg: require('../icons/planet_med.svg') },
  question_med: { width: 22, height: 22, svg: require('../icons/question_med.svg') },
  question_small: { width: 16, height: 16, svg: require('../icons/question_small.svg') },
  report: { width: 22, height: 28, svg: require('../icons/report.svg') },
  ribbon_med: { width: 16, height: 16, svg: require('../icons/ribbon_med.svg') },
  satellite_small: { width: 16, height: 22, svg: require('../icons/satellite_small.svg') },
  search_small: { width: 16, height: 16, svg: require('../icons/search_small.svg') },
  sliders: { width: 18, height: 18, svg: require('../icons/sliders.svg') },
  sort_handle: { width: 22, height: 7, svg: require('../icons/sort_handle.svg') },
  street_view: { width: 8, height: 20, svg: require('../icons/street view.svg') },
  target_small: { width: 16, height: 16, svg: require('../icons/target_small.svg') },
  territory_med: { width: 20, height: 20, svg: require('../icons/territory_med.svg') },
  territory_small: { width: 18, height: 16, svg: require('../icons/territory_small.svg') },
  trash_med: { width: 17, height: 20, svg: require('../icons/trash_med.svg') },
  tree_med: { width: 16, height: 22, svg: require('../icons/tree_med.svg') },
  user_avatar: { width: 120, height: 120, svg: require('../icons/user_avatar.svg') },
  user_med: { width: 22, height: 23, svg: require('../icons/user_med.svg') },
  user_round: { width: 32, height: 31, svg: require('../icons/user_round.svg') },
  user_small: { width: 15, height: 17, svg: require('../icons/user_small.svg') },
  zoomin: { width: 14, height: 14, svg: require('../icons/zoomin.svg') },
  zoomout: { width: 14, height: 2, svg: require('../icons/zoomout.svg') },
}
/* eslint-enable global-require */

const Icon = ({ icon, className, width, height }) => {
  if (!ICONS[icon]) {
    console.error(new Error(`Icon \`${icon}\` no found.`))
    return null
  }
  const info = ICONS[icon]
  const props = {
    className,
    width: width || info.width,
    height: height || info.height,
    viewBox: info.svg.default.viewBox,
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
