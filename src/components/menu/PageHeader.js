import React from "react"

import { Header, Flag, Grid } from "semantic-ui-react"

const PageHeader = () => (
  <Grid textAlign="center" padded>
    <Grid.Row>
      <Header as="h1" textAlign="center">
        <Header.Content>
          {" "}
          Dataset: Population By First Language, Nepal Census 2011-2012 <Flag name="nepal" />{" "}
        </Header.Content>
        <Header.Subheader>D3.js with React</Header.Subheader>
      </Header>
    </Grid.Row>
  </Grid>
)

export default PageHeader
