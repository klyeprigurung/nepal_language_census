import React, { Component } from "react"
import { Grid } from "semantic-ui-react"
import * as d3 from "d3"

class BubbleCharts extends Component {
  constructor() {
    super()
    this.state = {
      width: 700,
      height: 400,
      districtData: {},
    }
  }
  componentDidMount = () => {
    let childrenData = { children: this.props.districtData }
    this.setState({ districtData: childrenData })
  }

  transform = (data) => "translate(" + data.x + "," + data.y + ")"

  render() {
    // console.log("we here in bubbles:" + JSON.stringify(this.state.districtData));
    let childrenData = { children: this.props.districtData }
    let bubbles = d3.pack().size([this.state.width, this.state.height])
    let nodes = d3.hierarchy(childrenData).sum(function (d) {
      return d.total
    })
    let color = d3.scaleOrdinal(d3.schemeCategory10)
    let dataNodes = bubbles(nodes).descendants()
    dataNodes = dataNodes.filter((d) => !!d.parent)

    return (
      <Grid.Column>
        <svg
          width={this.state.width}
          height={this.state.height}
          // viewBox="0 0 600 600"
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          fill="gray"
        >
          {dataNodes.map((d, i) => (
            <g key={d.data.language + i} className="node" transform={this.transform(d)}>
              <circle
                key={d.data.language + i + "circle"}
                // r={scaleRadius(d.data.total)}
                r={d.r}
                fill={color(i)}
              />
              <text key={d.data.language + "text1"} fill="white" textAnchor="middle" dy=".2em" fontSize={d.r / 3}>
                {d.data.language}
              </text>
              <text key={d.data.language + "text2"} fill="white" textAnchor="middle" dy="1.3em" fontSize={d.r / 3}>
                {d.data.total}
              </text>
            </g>
          ))}
        </svg>
      </Grid.Column>
    )
  }
}

export default BubbleCharts
