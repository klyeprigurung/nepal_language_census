import React, { Component } from "react"
import { Header, Segment } from "semantic-ui-react"

export default class DistrictStat extends Component {
  constructor() {
    super()
    this.state = { width: 175, height: 175 }
  }

  getStatSegments = () => {
    let data = this.props.data
    let square = { width: 175, height: 175 }
    return data.map((d, i) => (
      <Segment circular style={square} key={d.language} color="red" inverted>
        <Header as="h2">
          {`${d.language} ${d.totalSpeakers.toLocaleString()}`}
          <Header.Subheader inverted>{`Total Districts:${d.totalDistricts}`}</Header.Subheader>
        </Header>
      </Segment>
    ))
  }
  render() {
    return this.getStatSegments()
  }
}
