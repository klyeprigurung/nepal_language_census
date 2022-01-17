import React from "react"
import { Icon, Statistic, Divider } from "semantic-ui-react"

const LanguageStat = () => (
  <div>
    <h4>Language Stat</h4>
    <Divider />
    <Statistic color="red">
      <Statistic.Value>
        <Icon name="group" /> 28.98M
      </Statistic.Value>
      <Statistic.Label>Population</Statistic.Label>
    </Statistic>

    <br />
    <Statistic color="green">
      <Statistic.Value>
        <Icon name="chart area" />
        147,181 KM²
      </Statistic.Value>
      <Statistic.Label>Area</Statistic.Label>
    </Statistic>
    <br />
    <Statistic color="teal">
      <Statistic.Value>
        <Icon name="language" />
        122
      </Statistic.Value>
      <Statistic.Label> Languages</Statistic.Label>
    </Statistic>
    <br />
    <Statistic color="yellow">
      <Statistic.Value>
        <Icon name="male" />
        <Icon name="child" />
        <Icon name="female" />
        125
      </Statistic.Value>
      <Statistic.Label> Ethnic groups</Statistic.Label>
    </Statistic>
  </div>
)

export default LanguageStat
