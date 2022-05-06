import React from 'react';
import { Component } from 'react';

export type TableProps = {
  indexColumn: string | number;
  columns: string[];
  schema: string[];
  records: any[];
  onClick?: (record: any) => void;
};

export class DynamicTable extends Component<TableProps> {
  columnsHeader() {
    const columnsElement = [];

    for (const column of this.props.columns) {
      columnsElement.push(
        <th scope="col" key={'col_' + column}>
          {column}
        </th>,
      );
    }

    return <tr>{columnsElement}</tr>;
  }

  onClick = (record: any) => {
    if (this.props.onClick) {
      this.props.onClick(record);
    }

    return;
  };

  records() {
    const rowsElement = [];

    for (const row of this.props.records) {
      for (const column of this.props.schema) {
        if (column == this.props.indexColumn) {
          rowsElement.push(
            <th scope="row" key={column} onClick={() => this.onClick(row)}>
              {row[this.props.indexColumn]}
            </th>,
          );
        } else if (row.hasOwnProperty(column)) {
          rowsElement.push(
            <td key={column} onClick={() => this.onClick(row)}>
              {row[column].toString()}
            </td>,
          );
        }
      }
    }

    return <tr>{rowsElement}</tr>;
  }

  render() {
    return (
      <table className="table table-hover table-bordered table-responsive-sm">
        <thead>{this.columnsHeader()}</thead>
        <tbody>{this.records()}</tbody>
      </table>
    );
  }
}
