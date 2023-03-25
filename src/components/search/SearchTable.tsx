import DynamicTable from 'components/common/DaynamicTable';
import React, { useEffect, useState } from 'react';
import { SearchTableSchema, schema } from 'components/search/schema';
import Card from 'components/common/Card';
import { useDispatcher } from 'components/search/utils';
import { useHostState } from 'store/features/hosts';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SearchModal, { Action } from './SearchModal';
import { FormSearch } from 'components/search/SearchForm';
import SelectFilter from 'components/common/SelectFilter';
import SearchAndReset from 'components/common/SearchAndReset';
import { Option } from 'components/common/Select';
import Input from 'components/common/Input';
import { GetSearchParam } from 'api/clients/Hosts';
import PreviewModal from 'components/search/PreviewModal';
import { useSearchState } from 'store/features/search';

const searchOptions: Option[] = [
  { name: '검색기준', value: '' },
  { name: 'QueryKey', value: 'queryKey' },
  { name: 'Query', value: 'query' },
];

const sortOptions: Option[] = [
  { name: '정렬기준', value: '' },
  { name: '최신순', value: 'recent' },
  { name: '조회순', value: 'views' },
];

export interface SearchTableProps {
  hostId: number;
  onClick?: (r: SearchTableSchema) => any;
}

const SearchTable = ({ hostId, onClick }: SearchTableProps) => {
  const dispatcher = useDispatcher();
  const { previewImage, selectId } = useSearchState();
  const [records, setRecords] = useState<SearchTableSchema[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<Action>('create');
  const [formData, setFormData] = useState<FormSearch | null>(null);
  const { search, page } = useHostState();
  const [searchParams, setSearchParams] = useState<GetSearchParam>({
    page: 1,
    pageSize: 20,
  });

  const [select, setSelect] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      page: page.page,
      pageSize: page.pageSize,
    }));
  }, [hostId, page.page, page.pageSize]);

  useEffect(() => {
    setMapRecords();
  }, [search, search?.totalCount]);

  useEffect(() => {
    dispatcher.getList(hostId, searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (previewUrl == null) {
      dispatcher.setPreviewImage(null);
    }
  }, [previewUrl]);

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

  const handleEnterRow = (record: SearchTableSchema) => {
    console.log(record.id);
    dispatcher.getImage(record.id);
    setPreviewUrl(record.shortUrl);
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
        views: s.views,
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

  const refactorSchema = Object.assign({}, schema);

  for (const [key, value] of Object.entries(refactorSchema)) {
    if (key != 'update') {
      refactorSchema[key] = Object.assign(
        {
          onClick: handleEnterRow,
        },
        value,
      );
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
      let queryKey: string | undefined = undefined;
      let query: string | undefined = undefined;
      switch (select) {
        case 'queryKey':
          queryKey = queryString;
          break;
        case 'query':
          query = queryString;
          break;
      }

      setSearchParams((prev) => ({
        ...prev,
        queryKey: queryKey,
        query: query,
        page: 1,
        pageSize: 20,
      }));
    }
  };

  const handleReset = () => {
    setSelect('');
    setQueryString('');
  };

  const handleChangeSort = (selectedValue: string) => {
    let sortBy: string | undefined = undefined;
    let orderBy: string | undefined = undefined;

    setSort(selectedValue);
    switch (selectedValue) {
      case 'recent':
        sortBy = 'created_at';
        orderBy = 'desc';
        break;
      case 'views':
        sortBy = 'views';
        orderBy = 'desc';
        break;
      default:
        break;
    }

    setSearchParams((prev) => ({
      ...prev,
      sortBy,
      orderBy,
    }));
  };

  return (
    <>
      <Card header={`Host: ${hostId} Search`}>
        <Row className="mt-2 mb-4">
          <Col md="3">
            <SelectFilter
              label="Key"
              onChange={handleQueryKeyChange}
              options={searchOptions}
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
        <Row className="mt-2 mb-4">
          <Col md="3">
            <SelectFilter
              label="sort"
              onChange={handleChangeSort}
              options={sortOptions}
              value={sort}
            />
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
      <PreviewModal
        id={selectId}
        show={!!previewUrl}
        onHide={() => setPreviewUrl(null)}
        blobUrl={previewImage?.url || ''}
        filename={previewImage?.filename || ''}
        shorUrl={previewUrl || ''}
      />
    </>
  );
};

export default SearchTable;
