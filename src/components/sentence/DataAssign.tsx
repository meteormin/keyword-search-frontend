import React, { useState } from 'react';
import Select, { Option } from '../common/Select';
import { Button, Col, Row } from 'react-bootstrap';

export interface DataAssignProps {
  searchName: Option[];
  searchValue: string;
  selectedName: string | number;
  onSearch: (selectedName: string | number, searchValue: string) => any;
}

export interface DataAssignState {
  _searchName: Option[];
  _searchValue: string;
  _selectedName: string | number;
}

const DataAssign = ({
  searchName,
  searchValue,
  selectedName,
  onSearch,
}: DataAssignProps) => {
  const [_selectedName, setSelectedName] = useState(selectedName);
  const [_searchValue, setValue] = useState(searchValue);
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
              options={searchName}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                setSelectedName(e.target.options[selectedIndex].value);
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col md={8}>
        <Row>
          <Col md={8}>
            <input
              type={'text'}
              className="form-control w-100"
              id={'searchValue'}
              name={'searchValue'}
              value={_searchValue}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="검색어를 입력해 주세요."
            />
          </Col>
          <Col md={4}>
            <Button
              variant="dark"
              onClick={() => onSearch(_selectedName, _searchValue)}
            >
              생성 데이터 할당 받기
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DataAssign;
