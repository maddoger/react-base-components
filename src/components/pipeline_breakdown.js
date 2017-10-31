import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from './progress_bar'

function PipelineBreakdown({ stages, pipeline }) {
  const max = pipeline.length > 0 ? pipeline[0].leadCount : 0

  return (
    <table className="map-territory-stat -pipeline">
      <tbody>
        {pipeline.map(({ stageId, leadCount }, num) => (
          <tr key={stageId}>
            <td className="map-territory-stat_info">
              <div className="map-territory-stat_title">{stages[stageId].title}</div>
              <ProgressBar
                className="map-territory-stat_bar"
                value={leadCount / max}
                color={stages[stageId].color}
              />
            </td>
            <td className="map-territory-stat_percent">{num > 0 ? (Math.round(leadCount / max * 100) + '%') : ''}</td>
            <td className="map-territory-stat_value">{leadCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

PipelineBreakdown.propTypes = {
  stages: PropTypes.object.isRequired,
  pipeline: PropTypes.array,
}

PipelineBreakdown.defaultProps = {
  pipeline: [],
}

export default PipelineBreakdown
