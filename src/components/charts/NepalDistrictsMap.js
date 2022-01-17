import React, { Component } from "react"
import { geoMercator, geoPath, geoCentroid } from "d3-geo"
import { feature } from "topojson-client"
import districtLanguages from "../../data/DistrictLanguages"
import width from "text-width"
import nepalDistricts from "../../data/NepalDistrictsTopo"
import DistrictTable from "../tables/DistrictTable"
import "../../assets/css/App.css"
import { Grid } from "semantic-ui-react"
import LanguageBubbleChart from "./LanguageBubbleChart"
import _ from "lodash"
import * as d3 from "d3"
import { colorScale } from "../../types"

class NepalDistrictsMap extends Component {
  constructor() {
    super()
    this.state = {
      districtTopo: [],
      width: 500,
      height: 300,
      cx: 0,
      cy: 0,
      clickedDistrict: "",
      districtData: [],
      selectedLanguage: "",
      hoveredDistrict: "",
    }
  }
  componentDidMount = () =>
    this.setState({
      districtTopo: feature(nepalDistricts, nepalDistricts.objects.nepal).features,
    })

  getFillColor = (district) => {
    // console.log(_.sumBy(districtLanguages, 'total'));
    if (!this.state.selectedLanguage.length) {
      return "lightgray"
    }
    let colorQuantile = d3
      .scaleQuantile()
      .range(colorScale)
      .domain([
        0,
        d3.max(districtLanguages.filter((dl) => dl.language === this.state.selectedLanguage).map((d) => d.total)),
      ])

    let dData = districtLanguages.filter((d) => {
      return d.district === district && d.language === this.state.selectedLanguage
    })

    // let total = 0
    if (!!dData.length) {
      let total = dData[0].total
      // console.log(JSON.stringify(dData));
      // console.log(`lang:${this.state.selectedLanguage} district:${district} total:${total} max:${languageDomain[1]} color:${colorQuantile(total)}`)
      return colorQuantile(total)
    }

    return "rgb(254,255,249)"
  }

  projection() {
    return geoMercator()
      .scale(4000)
      .center([79.0032936, 29.1219088])
      .translate([this.state.width / 90, this.state.height / 2])
  }

  mouseEnter = (weHere, centroid) =>
    this.setState({
      districtClicked: false,
      cx: centroid[0],
      cy: centroid[1],
      hoveredDistrict: weHere,
    })

  languageSelected = (e, { value }) => this.setState({ selectedLanguage: value, clickedDistrict: "" })

  mouseLeave = () => this.setState({ hoveredDistrict: "" })

  // onDistrictClick = clickedDistrict =>
  //     this.setState({
  //         clickedDistrict: clickedDistrict,
  //         districtClicked: true,
  //         districtData: districtLanguages.filter(
  //             dData => dData.district === clickedDistrict
  //         )
  //     });

  render() {
    // console.log(this.getFillColor());
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          {!!this.state.clickedDistrict && (
            <LanguageBubbleChart
              districtData={districtLanguages.filter((dData) => dData.district === this.state.clickedDistrict)}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <svg width={this.state.width} height={this.state.height} viewBox="0 0 800 450">
            <g className="districts" onMouseLeave={this.mouseLeave}>
              {this.state.districtTopo.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="district"
                  stroke="black"
                  fill={this.getFillColor(d.properties.name)}
                  // fill={"grey"}
                  strokeWidth={0.5}
                  onMouseEnter={() => this.mouseEnter(d.properties.name, this.projection()(geoCentroid(d)))}
                  onClick={() => this.props.districtClicked(d.properties.name)}
                />
              ))}
            </g>
            {!!this.state.hoveredDistrict && (
              <g className="districtTooltip">
                <rect
                  height="20"
                  fill="black"
                  x={this.state.cx}
                  y={this.state.cy - 50}
                  width={width(this.state.hoveredDistrict)}
                />
                <text x={this.state.cx + 3} y={this.state.cy - 35} fill="white" className="marker">
                  {this.state.hoveredDistrict}
                </text>
              </g>
            )}
          </svg>
        </Grid.Column>
        <Grid.Column>
          {!!this.state.clickedDistrict && <DistrictTable districtData={this.state.districtData} />}
        </Grid.Column>
      </Grid>
    )
  }
}

export default NepalDistrictsMap
