import DynamicTable from 'components/common/DaynamicTable';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { SearchTableSchema, schema } from 'components/search/schema';
import Card from 'components/common/Card';
import { useDispatcher, defaultOnClick } from 'components/search/utils';
import { useHostState } from 'store/features/hosts';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SearchModal, { Action } from './SearchModal';
import { FormSearch } from 'components/search/SearchForm';
import SelectFilter from 'components/common/SelectFilter';
import SearchAndReset from 'components/common/SearchAndReset';
import { Option } from 'components/common/Select';
import Input from '../common/Input';

const selectOptions: Option[] = [
  { name: '검색기준', value: '' },
  { name: 'QueryKey', value: 'queryKey' },
  { name: 'Query', value: 'query' },
];

export interface SearchTableProps {
  hostId: number;
  onClick?: (r: SearchTableSchema) => any;
}

const SearchTable = ({ hostId, onClick }: SearchTableProps) => {
  const dispatcher = useDispatcher();
  const [records, setRecords] = useState<SearchTableSchema[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<Action>('create');
  const [formData, setFormData] = useState<FormSearch | null>(null);
  const { search, page } = useHostState();

  const [select, setSelect] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');

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

  const handleQueryKeyChange = (selectedValue: string) => {
    setSelect(selectedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value);
  };

  const handleSearch = () => {
    if (select && queryString) {
      let queryKey = undefined;
      let query = undefined;
      switch (select) {
        case 'queryKey':
          queryKey = queryString;
          break;
        case 'query':
          query = queryString;
          break;
      }

      dispatcher.getList(hostId, {
        queryKey: queryKey,
        query: query,
        page: 1,
        pageSize: 20,
      });
    }
  };

  const handleReset = () => {
    setSelect('');
    setQueryString('');
  };

  return (
    <>
      <Card header={`Host: ${hostId} Search`}>
        <Row className="mt-2 mb-4">
          <Col md="3">
            <SelectFilter
              label="Key"
              onChange={handleQueryKeyChange}
              options={selectOptions}
              value={select}
            />
          </Col>
          <Col md="6">
            <Input
              type="text"
              id="queryString"
              name="queryString"
              value={queryString}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <SearchAndReset onSearch={handleSearch} onReset={handleReset} />
          </Col>
        </Row>
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
