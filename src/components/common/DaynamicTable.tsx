import React from 'react';
import { Table } from 'react-bootstrap';

export interface DynamicTableProps {
  schema: DynamicSchema;
  records: any[];
  onClick?: (record: any | any[]) => void;
  onHover?: {
    onEnter: (record: any | any[]) => void;
    onLeave: (record: any | any[]) => void;
  };
}

export interface DynamicSchema {
  [key: string]: {
    name: string | JSX.Element | JSX.Element[];
    primaryKey?: boolean;
    onClick?: (records: any[]) => void;
    onHover?: {
      onEnter: (record: any | any[]) => void;
      onLeave: (record: any | any[]) => void;
    };
  };
}

const DynamicTable = (props: DynamicTableProps) => {
  const columnsHeader = () => {
    const columnsElement = [];

    for (const [key, column] of Object.entries(props.schema)) {
      columnsElement.push(
        <th
          scope="col"
          key={'col_' + key}
          onClick={() => {
            if (column.onClick) {
              column.onClick(props.records);
            }
          }}
        >
          {column.name}
        </th>,
      );
    }

    return <tr className="text-center align-middle">{columnsElement}</tr>;
  };

  const onClick = (record: any) => {
    if (props.onClick) {
      props.onClick(record);
    }
  };

  const hasOnClick = (param: any): boolean => {
    return 'onClick' in param;
  };

  const addCursor = (param: any) => {
    if (hasOnClick(param)) {
      return {
        cursor: 'pointer',
      };
    }

    return {};
  };

  const records = () => {
    let rowsElement = [];
    const records: JSX.Element[] = [];

    props.records.forEach((row, index) => {
      rowsElement = [];
      for (const [key, column] of Object.entries(props.schema)) {
        if (column.primaryKey) {
          rowsElement.push(
            <th
              scope="row"
              key={key}
              style={addCursor(column)}
              onClick={() => {
                if (column.onClick) {
                  column.onClick(row);
                }
              }}
            >
              {row[key]}
            </th>,
          );
        } else if (key in row) {
          rowsElement.push(
            <td
              key={key}
              onClick={() => {
                if (column.onClick) {
                  column.onClick(row);
                }
              }}
              onMouseEnter={() => {
                if (column.onHover?.onEnter) {
                  column.onHover.onEnter(row);
                }
              }}
              onMouseLeave={() => {
                if (column.onHover?.onLeave) {
                  column.onHover.onLeave(row);
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
          onClick={() => onClick(row)}
          onMouseEnter={() => props.onHover?.onEnter(row)}
          onMouseLeave={() => props.onHover?.onLeave(row)}
          style={addCursor(props)}
        >
          {rowsElement}
        </tr>,
      );
    });

    return records;
  };

  return (
    <Table responsive="sm" hover className={'align-content-center'}>
      <thead className={'table-light'}>{columnsHeader()}</thead>
      <tbody>{records()}</tbody>
    </Table>
  );
};

export default DynamicTable;
