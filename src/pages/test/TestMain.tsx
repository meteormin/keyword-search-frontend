import DynamicTable, {
  DynamicTableProps,
} from 'components/common/DaynamicTable';
import Content from 'components/layouts/Content';
import React from 'react';
import { useDispatch } from 'react-redux';
import alertModalModule from 'store/features/common/alertModal';

const TestMain = () => {
  const dispatch = useDispatch();
  const testTable: DynamicTableProps = {
    schema: {
      id: { name: 'id', primaryKey: true },
      name: { name: 'name' },
      text: { name: 'text' },
      createdAt: { name: 'createdAt' },
    },
    records: [
      {
        id: '1',
        name: 'name',
        text: 'test',
        createdAt: '2022-05-06',
      },
      {
        id: '2',
        name: 'name2',
        text: 'test2',
        createdAt: '2022-05-07',
      },
    ],
    onClick: (record) =>
      dispatch(
        alertModalModule.showAlert({
          title: record.name,
          message: record.text,
        }),
      ),
  };

  return (
    <Content header={'Header'} subject={'Subject'}>
      <DynamicTable {...testTable} />
    </Content>
  );
};

export default TestMain;
