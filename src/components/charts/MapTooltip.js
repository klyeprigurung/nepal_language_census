import React from "react"
import width from "text-width"

const MapToolTip = ({ cx, cy, hoveredDistrict }) => {
  return (
    <g className="districtTooltip">
      <rect height="20" fill="black" x={cx} y={cy - 50} width={width(hoveredDistrict)} />
      <text x={cx + 3} y={cy - 35} fill="white" className="marker">
        {hoveredDistrict}
      </text>
    </g>
  )
}

export default MapToolTip
