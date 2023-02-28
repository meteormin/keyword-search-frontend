import DynamicTable from 'components/common/DaynamicTable';
import React, { Fragment, useEffect, useState } from 'react';
import { SearchTableSchema, schema } from 'components/search/schema';
import Card from 'components/common/Card';
import { apiCall, defaultOnClick } from 'components/search/utils';
import { useDispatch, useSelector } from 'react-redux';
import hostStore from 'store/features/hosts';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SearchModal, { Action } from './SearchModal';
import { FormSearch } from './SearchForm';

export interface SearchTableProps {
  hostId: number;
  onClick?: (r: SearchTableSchema) => any;
}

const SearchTable = ({ hostId, onClick }: SearchTableProps) => {
  const dispatcher = apiCall(useDispatch());
  const [records, setRecords] = useState<SearchTableSchema[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<Action>('create');
  const [formData, setFormData] = useState<FormSearch | null>(null);
  const { search, page } = useSelector(hostStore.getState);

  useEffect(() => {
    dispatcher.getList(hostId, page);
  }, [hostId, page.page, page.pageSize]);

  useEffect(() => {
    setMapRecords();
  }, [search, search?.totalCount]);

  const UpdateButton = (hostId: number, data: FormSearch) => {
    return (
      <Button
        variant={'success'}
        onClick={() => {
          setFormData(data);
          setAction('update');
          setShow(true);
        }}
      >
        Update
      </Button>
    );
  };

  const handleClickCreate = () => {
    setFormData({ hostId: hostId });
    setAction('create');
    setShow(true);
  };

  const mapSearchTable = () => {
    return search?.data.map((s): SearchTableSchema => {
      return {
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        shortUrl: s.shortUrl,
        id: s.id,
        publish: <Form.Check type="switch" disabled checked={s.publish} />,
        description: s.description,
        query: s.query,
        queryKey: s.queryKey,
        update: UpdateButton(s.hostId, s),
        origin: s,
      };
    });
  };

  const setMapRecords = () => {
    const mapped = mapSearchTable();
    if (search?.data && mapped) {
      setRecords(mapped);
    }
  };

  if (!onClick) {
    onClick = defaultOnClick;
  }

  const refactorSchema = Object.assign({}, schema);

  for (const [key, value] of Object.entries(refactorSchema)) {
    if (key != 'update') {
      refactorSchema[key] = Object.assign({ onClick: onClick }, value);
    }
  }

  return (
    <>
      <Card header={`Host: ${hostId} Search`}>
        <DynamicTable schema={refactorSchema} records={records} />
        <Row className="mt-4">
          <Col>
            <Button className="float-end me-3" onClick={handleClickCreate}>
              Create
            </Button>
          </Col>
        </Row>
      </Card>
      {show && action ? (
        <SearchModal
          show={show}
          action={action}
          data={formData}
          onHide={() => setShow(false)}
        />
      ) : null}
    </>
  );
};

export default SearchTable;
