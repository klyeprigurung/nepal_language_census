import React, { Component } from "react"
import { Responsive, Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react"

export default class SidebarMenu extends Component {
  render() {
    return (
      <Sidebar as={Menu} animation="push" icon="labeled" inverted vertical visible width="thin">
        <Menu.Item as="a">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="linkedin" />
          LinkedIn
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="github square" />
          GitHub
        </Menu.Item>
      </Sidebar>
    )
  }
}
