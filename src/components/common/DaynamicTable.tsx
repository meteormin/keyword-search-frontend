import React from 'react';
import { Component } from 'react';
import { Table } from 'react-bootstrap';

export interface DynamicTableProps {
  schema: DynamicSchema;
  records: any[];
  onClick?: (record: any | any[]) => void;
}

export interface DynamicSchema {
  [key: string]: {
    name: string | JSX.Element | JSX.Element[];
    primaryKey?: boolean;
    onClick?: (records: any[]) => void;
  };
}

class DynamicTable extends Component<DynamicTableProps> {
  columnsHeader() {
    const columnsElement = [];

    for (const [key, column] of Object.entries(this.props.schema)) {
      columnsElement.push(
        <th
          scope="col"
          key={'col_' + key}
          onClick={() => {
            if (column.onClick) {
              column.onClick(this.props.records);
            }
          }}
        >
          {column.name}
        </th>,
      );
    }

    return <tr className="text-center align-middle">{columnsElement}</tr>;
  }

  onClick = (record: any) => {
    if (this.props.onClick) {
      this.props.onClick(record);
    }

    return;
  };

  hasOnClick = (param: any) => {
    return param.hasOwnProperty('onClick');
  };

  addCursor = (param: any) => {
    if (this.hasOnClick(param)) {
      return {
        cursor: 'pointer',
      };
    }

    return {};
  };

  records() {
    let rowsElement = [];
    const records: JSX.Element[] = [];

    this.props.records.forEach((row, index) => {
      rowsElement = [];
      for (const [key, column] of Object.entries(this.props.schema)) {
        if (column.primaryKey) {
          rowsElement.push(
            <th
              scope="row"
              key={key}
              style={this.addCursor(column)}
              onClick={() => {
                if (column.onClick) {
                  column.onClick(row);
                }
              }}
            >
              {row[key]}
            </th>,
          );
        } else if (row.hasOwnProperty(key)) {
          rowsElement.push(
            <td
              key={key}
              onClick={() => {
                if (column.onClick) {
                  column.onClick(row);
                }
              }}
            >
              {row[key]}
            </td>,
          );
        }
      }
      records.push(
        <tr
          key={'tr_' + index.toString()}
          className="text-center"
          onClick={() => this.onClick(row)}
          style={this.addCursor(this.props)}
        >
          {rowsElement}
        </tr>,
      );
    });

    return records;
  }

  render() {
    return (
      <Table responsive="sm" hover className={'align-content-center'}>
        <thead className={'table-light'}>{this.columnsHeader()}</thead>
        <tbody>{this.records()}</tbody>
      </Table>
    );
  }
}

export default DynamicTable;
