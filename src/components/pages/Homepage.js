import React, { Component } from "react"
import NepalMap from "../charts/MapOnly"
import FilterOptions from "../menu/FilterOptions"
import districtLanguages from "../../data/DistrictLanguages"
import { Container, Grid, Header, GridRow } from "semantic-ui-react"
import _ from "lodash"
import PageHeader from "../menu/PageHeader"
import DataTable from "../tables/DataTable"
import OmniBubbleChart from "../charts/OmniBubbleChart"
import LanguageStat from "../stats/LanguageStat"

class Homepage extends Component {
  constructor() {
    super()
    this.state = {
      districtTopo: [],
      clickedDistrict: "",
      districtData: [],
      selectedLanguage: "",
      districtClicked: false,
      languageData: [],
      displayData: [],
    }
  }

  onDistrictClick = (clickedDistrict) =>
    this.setState({
      selectedLanguage: "",
      clickedDistrict: clickedDistrict,
      districtClicked: true,
      displayData: _.orderBy(
        districtLanguages.filter((dData) => dData.district === clickedDistrict),
        ["total"],
        ["desc"]
      ),
    })

  districtSelected = (e, { value }) => this.onDistrictClick(value)

  languageSelected = (e, { value }) =>
    this.setState({
      selectedLanguage: value,
      clickedDistrict: "",
      displayData: _.orderBy(
        districtLanguages.filter((dData) => dData.language === value),
        ["total"],
        ["desc"]
      ),
    })

  getLanguageStats = () => {
    let languages = _.groupBy(districtLanguages, "language")

    let languageStats = []

    for (let language in languages) {
      let totalDistricts = languages[language].length
      let totalSpeakers = _.sumBy(languages[language], "total")

      languageStats.push({ language, totalDistricts, totalSpeakers })
    }
    console.log(JSON.stringify(_.orderBy(languageStats, ["totalSpeakers"], ["desc"])))

    return languageStats
  }

  render() {
    let { clickedDistrict, displayData, selectedLanguage } = this.state
    // console.log(JSON.stringify(_.groupBy(districtLanguages, 'language')))
    // let Lthis.getLanguageStats();
    return (
      <div>
        <Container>
          <PageHeader />
          <Grid textAlign="center" style={{ backgroundColor: "#F8F8F8" }} stackable>
            <GridRow columns={1}>
              <Grid.Column textAlign="center">
                <FilterOptions
                  languages={_.uniq(districtLanguages.map((d) => d.language)).sort()}
                  languageSelected={this.languageSelected}
                  districtSelected={this.districtSelected}
                  districts={_.uniq(districtLanguages.map((d) => d.district)).sort()}
                />
              </Grid.Column>
            </GridRow>

            <GridRow>
              <Grid.Column>
                <NepalMap
                  onDistrictClick={this.onDistrictClick}
                  districtSelected={this.districtSelected}
                  languageSelected={this.languageSelected}
                  selectedLanguage={selectedLanguage}
                  clickedDistrict={clickedDistrict}
                />
              </Grid.Column>
            </GridRow>
          </Grid>

          {!!displayData.length && (
            <div>
              <br /> <br />
              <Grid columns={2} stackable>
                <Grid.Column
                  textAlign="center"
                  style={{ backgroundColor: "#F5F5F5" }}
                  mobile={16}
                  tablet={8}
                  computer={8}
                >
                  <OmniBubbleChart
                    bubbleData={displayData}
                    clickedDistrict={clickedDistrict}
                    selectedLanguage={selectedLanguage}
                  />
                </Grid.Column>
                <Grid.Column
                  style={{ backgroundColor: "#F5F5F5" }}
                  textAlign="center"
                  mobile={16}
                  tablet={8}
                  computer={8}
                >
                  <LanguageStat />
                </Grid.Column>
              </Grid>
              <br /> <br />
              <Grid style={{ backgroundColor: "#F5F5F5" }}>
                <Grid.Column>
                  {/* <BarChart data={displayData} /> */}
                  {/* <DistrictStat data={_.slice(displayData,0,5)}/> */}
                  <Header as="h2" textAlign="center">
                    Data Table
                  </Header>
                  <DataTable tableData={displayData} />
                </Grid.Column>
              </Grid>
            </div>
          )}
        </Container>
        {/* <DistrictStat data={_.slice(_.orderBy(this.getLanguageStats(), ["totalSpeakers"], ["desc"]), 0, 5)} /> */}
      </div>
    )
  }
}

export default Homepage
