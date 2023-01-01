import DynamicTable from 'components/common/DaynamicTable';
import React from 'react';
import { SearchTableSchema, schema } from 'components/search/schema';
import Card from 'components/common/Card';
import { defaultOnClick } from './utils';

export interface SearchTableProps {
  hostId: number;
  records: SearchTableSchema[];
  readOnly?: boolean;
  onClick?: (r: SearchTableSchema) => any;
}

const SearchTable = ({
  hostId,
  records,
  readOnly,
  onClick,
}: SearchTableProps) => {
  if (!onClick) {
    onClick = defaultOnClick;
  }

  return (
    <Card header={`Host: ${hostId} Search`}>
      <DynamicTable
        schema={schema}
        records={records}
        onClick={readOnly == undefined ? onClick : () => null}
      />
    </Card>
  );
};

export default SearchTable;
