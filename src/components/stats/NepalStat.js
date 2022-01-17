import React from "react"
import { Icon, Segment, Statistic } from "semantic-ui-react"

const NepalStat = () => (
  <Segment inverted>
    <Statistic.Group widths="four" inverted size="mini">
      <Statistic color="red" inverted>
        <Statistic.Value>
          <Icon name="group" />
          28.98M
        </Statistic.Value>
        <Statistic.Label>Population</Statistic.Label>
      </Statistic>

      <Statistic inverted color="green">
        <Statistic.Value>
          <Icon name="chart area" />
          147,181 KM²
        </Statistic.Value>
        <Statistic.Label>Area</Statistic.Label>
      </Statistic>

      <Statistic inverted color="teal">
        <Statistic.Value>
          <Icon name="language" />
          122
        </Statistic.Value>
        <Statistic.Label>Languages</Statistic.Label>
      </Statistic>

      <Statistic inverted color="yellow">
        <Statistic.Value>
          <Icon name="male" />
          <Icon name="child" />
          <Icon name="female" />
          125
        </Statistic.Value>
        <Statistic.Label>Ethnic groups</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </Segment>
)

export default NepalStat
