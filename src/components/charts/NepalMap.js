import React, { Component } from "react"
import { geoMercator, geoPath, geoCentroid } from "d3-geo"
import { feature } from "topojson-client"
import districtLanguages from "../../data/DistrictLanguages"
import nepalDistricts from "../../data/NepalDistrictsTopo"
import DistrictTable from "../tables/DistrictTable"
import "../../assets/css/App.css"
import { Grid, GridColumn } from "semantic-ui-react"
import BubbleChart from "./BubbleChart"
import _ from "lodash"
import FilterOptions from "../menu/FilterOptions"
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
    if (district === this.state.clickedDistrict) {
      return "green"
    }

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

    if (!!dData.length) {
      let total = dData[0].total
      return colorQuantile(total)
    }

    return "rgb(254,255,249)"
  }

  projection() {
    return geoMercator()
      .scale(4000)
      .center([79.0032936, 29.1219088])
      .translate([this.state.width / 40, this.state.height / 2.5])
  }

  mouseEnter = (weHere, centroid) =>
    this.setState({
      districtClicked: false,
      cx: centroid[0],
      cy: centroid[1],
      hoveredDistrict: weHere,
    })

  districtSelected = (e, { value }) => this.onDistrictClick(value)

  languageSelected = (e, { value }) => this.setState({ selectedLanguage: value, clickedDistrict: "" })

  mouseLeave = () => this.setState({ hoveredDistrict: "" })

  onDistrictClick = (clickedDistrict) =>
    this.setState({
      selectedLanguage: "",
      clickedDistrict: clickedDistrict,
      districtClicked: true,
      districtData: districtLanguages.filter((dData) => dData.district === clickedDistrict),
    })

  getFilterText = () => {
    let { clickedDistrict, selectedLanguage } = this.state
    let selectedFilter = !!clickedDistrict.length ? `District:${clickedDistrict}` : ""

    return !!selectedLanguage.length && !selectedFilter.length ? `Language:${selectedLanguage}` : selectedFilter
  }

  render() {
    let filterText = this.getFilterText()
    console.log(this.props.parentWidth)

    return (
      <Grid>
        {/* <Grid.Row > */}
        <Grid.Column width={6} textAlign="center">
          <FilterOptions
            languages={_.uniq(districtLanguages.map((d) => d.language)).sort()}
            languageSelected={this.languageSelected}
            districtSelected={this.districtSelected}
            districts={_.uniq(districtLanguages.map((d) => d.district)).sort()}
          />
        </Grid.Column>

        <Grid.Column width={10} textAlign="center">
          <svg width={this.state.width} height={this.state.height} viewBox="0 0 500 350">
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
                  onClick={() => this.onDistrictClick(d.properties.name)}
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
        </Grid.Column>

        {/* </Grid.Row>
                <Grid.Row> */}

        {/* </Grid.Row>
                <Grid.Row> */}
        <Grid.Column style={{ backgroundColor: "" }}>
          {!!this.state.clickedDistrict && false && <DistrictTable districtData={this.state.districtData} />}
          {!!this.state.clickedDistrict && (
            <BubbleChart
              districtData={districtLanguages.filter((dData) => dData.district === this.state.clickedDistrict)}
            />
          )}
        </Grid.Column>
        {/* </Grid.Row> */}
      </Grid>
    )
  }
}

//export default NepalMap;
export default ResponsiveWrapper(NepalMap)
