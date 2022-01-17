import React, { Component } from "react"
import { Divider } from "semantic-ui-react"
import * as d3 from "d3"
import ResponsiveWrapper from "../ResponsiveWrapper"
import BubbleTooltip from "./BubbleTooltip"

class OmniBubbleChart extends Component {
  constructor() {
    super()
    this.state = {
      width: 400,
      height: 400,
      hoveredBubble: false,
    }
  }
  transform = (data) => `translate(${data.x},${data.y})`

  mouseEnter = (hoveredCircle) => {
    let hoverText = !!this.props.clickedDistrict ? hoveredCircle.data.language : hoveredCircle.data.district
    hoverText += " " + hoveredCircle.data.total
    this.setState({
      cx: hoveredCircle.x,
      cy: hoveredCircle.y - hoveredCircle.r,
      cr: hoveredCircle.r,
      hoveredBubble: hoverText,
    })
  }

  mouseLeave = () => {
    this.setState({
      hoveredBubble: false,
    })
  }

  getBubbles = (clickedDistrict, bubbleData) => {
    let childrenData = { children: bubbleData }
    let bubbles = d3.pack().size([this.state.width, this.state.height])
    let nodes = d3.hierarchy(childrenData).sum(function (d) {
      return d.total
    })
    let color = d3.scaleOrdinal(d3.schemeCategory10)
    let dataNodes = bubbles(nodes).descendants()
    dataNodes = dataNodes.filter((d) => !!d.parent)

    return dataNodes.map((d, i) => (
      <g
        key={d.data.language + i}
        className="node"
        transform={this.transform(d)}
        onMouseEnter={() => this.mouseEnter(d)}
        onMouseLeave={this.mouseLeave}
      >
        <circle key={d.data.language + i + "circle"} r={d.r} fill={color(i)} />

        <text key={d.data.language + "text1"} fill="white" textAnchor="middle" dy=".2em" fontSize={d.r / 3}>
          {!!clickedDistrict ? d.data.language : d.data.district}
        </text>
        <text key={d.data.language + "text2"} fill="white" textAnchor="middle" dy="1.3em" fontSize={d.r / 3}>
          {d.data.total}
        </text>
      </g>
    ))
  }

  render() {
    let { clickedDistrict, selectedLanguage, bubbleData } = this.props
    let bubbles = this.getBubbles(clickedDistrict, bubbleData)

    return (
      <div>
        <h4>
          {!!clickedDistrict.length
            ? `Total Languages in ${clickedDistrict} District`
            : `Districts with ${selectedLanguage} Language Speakers`}
        </h4>
        <Divider />
        <svg
          width={this.state.width}
          height={this.state.height}
          viewBox="0 0 400 400"
          // viewBox={`0 0 ${this.props.parentWidth} ${this.state.height}`}
          fill="gray"
        >
          {bubbles}

          {!!this.state.hoveredBubble && (
            <BubbleTooltip cx={this.state.cx} cy={this.state.cy} hoveredBubble={this.state.hoveredBubble} />
          )}
        </svg>
      </div>
    )
  }
}

export default ResponsiveWrapper(OmniBubbleChart)
