import React, { Component } from "react"
import { Table } from "semantic-ui-react"

class DataTable extends Component {
  getTableRows = (tableData) => {
    return tableData.map((dData) => {
      return (
        <Table.Row key={`${dData.language}${dData.district}`}>
          <Table.Cell>{dData.district}</Table.Cell>
          <Table.Cell>{dData.language}</Table.Cell>
          <Table.Cell>{dData.total}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    return (
      <Table celled striped unstackable color="red">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>District</Table.HeaderCell>
            <Table.HeaderCell>Language</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.getTableRows(this.props.tableData)}</Table.Body>
      </Table>
    )
  }
}

export default DataTable
