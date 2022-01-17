import React, { Component } from "react"
import { Dropdown, Menu, Form } from "semantic-ui-react"

class FilterOptions extends Component {
  render() {
    return (
      <Menu size="tiny" widths={2}>
        <Menu.Item>
          <Form>
            <Form.Field inline>
              <label>Select Language:</label>
              <Dropdown
                scrolling
                placeholder={`${this.props.languages.length} total`}
                options={this.props.languages.map((d) => {
                  return { key: d, text: d, value: d }
                })}
                onChange={this.props.languageSelected}
              />
            </Form.Field>
          </Form>
        </Menu.Item>
        <Menu.Item>
          <Form>
            <Form.Field inline>
              <label>Select District:</label>
              <Dropdown
                scrolling
                placeholder={`${this.props.districts.length} total`}
                options={this.props.districts.map((d) => {
                  return { key: d, text: d, value: d }
                })}
                onChange={this.props.districtSelected}
              />
            </Form.Field>
          </Form>
        </Menu.Item>
      </Menu>
    )
  }
}

export default FilterOptions
