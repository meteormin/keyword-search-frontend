import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Select, { Option } from '../common/Select';

export interface DataSearchProps {
  onSearch: (selectedName: string | number, searchValue: string) => any;
  onReset: () => any;
}

const DataSearch = ({ onSearch, onReset }: DataSearchProps) => {
  const [selectedName, setSelectedName] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const searchNames = [
    {
      name: '개념집합',
      value: '개념집합',
    },
    {
      name: '고유번호',
      value: '고유번호',
    },
    {
      name: '주제',
      value: '주제',
    },
    {
      name: '도메인',
      value: 'domain',
    },
  ];

  return (
    <Row className="mx-2">
      <Col md={4}>
        <Row>
          <Col md={4}>
            <label className="form-label mt-2">
              <strong>데이터</strong>
            </label>
          </Col>
          <Col md={8}>
            <Select
              id={'searchData'}
              name={'searchData'}
              options={searchNames}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                setSelectedName(e.target.options[selectedIndex].value);
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <input
          type={'text'}
          className="form-control w-100"
          id={'searchValue'}
          name={'searchValue'}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="검색어를 입력해 주세요."
        />
      </Col>
      <Col md={4}>
        <Button
          variant="dark"
          style={{ height: '100%', width: '50%' }}
          onClick={() => {
            onSearch(selectedName, searchValue);
          }}
        >
          할당내 검색
        </Button>
        <Button
          variant="light"
          className="border"
          style={{ height: '100%', width: '50%' }}
          onClick={onReset}
        >
          초기화
        </Button>
      </Col>
    </Row>
  );
};

export default DataSearch;
