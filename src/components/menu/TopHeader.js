import React from "react"
import { Flag, Icon, Menu } from "semantic-ui-react"

const TopHeader = () => (
  <Menu size="tiny" pointing secondary icon>
    <Menu.Item header active>
      Nepal Languages &nbsp;
      <Flag name="nepal" />
    </Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item name="github" active={false} onClick={this.handleItemClick}>
        <Icon name="github" />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

export default TopHeader
