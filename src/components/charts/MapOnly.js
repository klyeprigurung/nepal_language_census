import React, { Component } from "react"
import { geoMercator, geoPath, geoCentroid } from "d3-geo"
import { feature } from "topojson-client"
import districtLanguages from "../../data/DistrictLanguages"
import nepalDistricts from "../../data/NepalDistrictsTopo"
import "../../assets/css/App.css"
import * as d3 from "d3"
import { colorScale } from "../../types"
import MapToolTip from "./MapTooltip"
import ResponsiveWrapper from "../ResponsiveWrapper"

class NepalMap extends Component {
  constructor() {
    super()
    this.state = {
      districtTopo: [],
      width: 500,
      height: 400,
      hoveredDistrict: "",
    }
  }
  componentDidMount = () =>
    this.setState({
      districtTopo: feature(nepalDistricts, nepalDistricts.objects.nepal).features,
    })

  getFillColor = (district) => {
    let { selectedLanguage } = this.props
    if (district === this.props.clickedDistrict) {
      return "green"
    }

    if (!this.props.selectedLanguage.length) {
      return "#F8F8F8"
    }

    let colorQuantile = d3
      .scaleQuantile()
      .range(colorScale)
      .domain([0, d3.max(districtLanguages.filter((dl) => dl.language === selectedLanguage).map((d) => d.total))])

    let dData = districtLanguages.filter((d) => {
      return d.district === district && d.language === selectedLanguage
    })

    if (!!dData.length) {
      let total = dData[0].total
      return colorQuantile(total)
    }

    return "#F8F8F8"
    // return "rgb(254,255,249)";
  }

  projection() {
    return geoMercator()
      .scale(4000)
      .center([79.0032936, 29.1219088])
      .translate([this.props.parentWidth / 20, this.state.height / 2.5])
  }

  mouseEnter = (weHere, centroid) =>
    this.setState({
      districtClicked: false,
      cx: centroid[0],
      cy: centroid[1],
      hoveredDistrict: weHere,
    })

  mouseLeave = () => this.setState({ hoveredDistrict: "" })

  getFilterText = () => {
    let { selectedLanguage, clickedDistrict } = this.props
    let selectedFilter = !!clickedDistrict.length ? `District:${clickedDistrict}` : ""

    return !!selectedLanguage.length && !selectedFilter.length ? `Language:${selectedLanguage}` : selectedFilter
  }

  render() {
    let filterText = this.getFilterText()
    let chartWidth = this.props.parentWidth

    return (
      <svg width={chartWidth} height={this.state.height} viewBox={`0 0 ${chartWidth} ${this.state.height}`}>
        <g className="districts" onMouseLeave={this.mouseLeave}>
          {this.state.districtTopo.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(this.projection())(d)}
              className="district"
              stroke="black"
              fill={this.getFillColor(d.properties.name)}
              strokeWidth={0.5}
              onMouseEnter={() => this.mouseEnter(d.properties.name, this.projection()(geoCentroid(d)))}
              onClick={() => this.props.onDistrictClick(d.properties.name)}
            />
          ))}
        </g>

        <text x="450" y="35" className="selectedFilter">
          {filterText}
        </text>

        {!!this.state.hoveredDistrict && (
          <MapToolTip cx={this.state.cx} cy={this.state.cy} hoveredDistrict={this.state.hoveredDistrict} />
        )}
      </svg>
    )
  }
}

//export default NepalMap;
export default ResponsiveWrapper(NepalMap)
