import {
  DynamicTable,
  TableProps,
} from '../../components/common/DaynamicTable';
import Content from '../../components/layouts/Content';
import React from 'react';
import { useDispatch } from 'react-redux';
import { alertModalModule } from '../../store/features/common/alertModal/alertModalReducer';

const TestMain = () => {
  const dispatch = useDispatch();
  const testTable: TableProps = {
    indexColumn: 'id',
    columns: ['id', 'name', 'text', 'createdAt'],
    schema: ['id', 'name', 'text', 'createdAt'],
    records: [
      {
        id: '1',
        name: 'name',
        text: 'test',
        createdAt: '2022-05-06',
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
