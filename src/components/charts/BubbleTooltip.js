import React from "react"
import width from "text-width"

const BubbleTooltip = ({ cx, cy, hoveredBubble }) => {
  return (
    <g className="districtTooltip">
      <rect height="20" fill="black" x={cx} y={cy - 20} width={width(hoveredBubble) + 2} />
      <text x={cx + 3} y={cy - 5} fill="white" className="marker">
        {hoveredBubble}
      </text>
    </g>
  )
}

export default BubbleTooltip
