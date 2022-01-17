import React from "react"
import { Flag, Container, Menu } from "semantic-ui-react"

const TopMenu = () => (
  <Menu fixed="top" secondary size="tiny">
    <Container>
      <Menu.Item as="a" header>
        <Flag name="nepal" />
        Nepal Languages
      </Menu.Item>
      {/* <Menu.Item as='a'>About</Menu.Item> */}
    </Container>
  </Menu>
)

export default TopMenu
