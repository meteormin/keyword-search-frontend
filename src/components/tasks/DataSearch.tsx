import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Select from '../common/Select';

export interface DataSearchProps {
  onSearch: (state: SearchName) => any;
  onReset: () => any;
}

export interface SearchName {
  concept?: string;
  refId?: number;
  domain?: string;
}

export enum SearchNames {
  NONE,
  CONCEPT,
  REF_ID,
  DOMAIN,
}

const DataSearch = ({ onSearch, onReset }: DataSearchProps) => {
  const [selectedName, setSelectedName] = useState<SearchNames | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const searchNames = [
    {
      name: '선택',
      value: SearchNames.NONE,
    },
    {
      name: '개념집합',
      value: SearchNames.CONCEPT,
    },
    {
      name: '고유번호',
      value: SearchNames.REF_ID,
    },
    {
      name: '주제',
      value: SearchNames.DOMAIN,
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
                const value = e.target.options[selectedIndex].value;
                if (value) {
                  setSelectedName(parseInt(value) as SearchNames);
                }
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
            const state: SearchName = {
              concept: undefined,
              refId: undefined,
              domain: undefined,
            };

            if (searchValue) {
              switch (selectedName) {
                case SearchNames.CONCEPT:
                  state.concept = searchValue;
                  break;
                case SearchNames.REF_ID:
                  state.refId = parseInt(searchValue as string);
                  break;
                case SearchNames.DOMAIN:
                  state.domain = searchValue;
                  break;
                default:
                  break;
              }
            }
            onSearch(state);
          }}
        >
          검색
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
