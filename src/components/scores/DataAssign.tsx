import React, { useEffect, useState } from 'react';
import Select, { Option } from '../common/Select';
import { Button, Col, Row } from 'react-bootstrap';

export interface DataAssignProps {
  onAssign: (selectedName: string | undefined) => any;
}

export interface DataAssignState {
  _searchName: Option[];
  _searchValue: string;
  _selectedName: string | number;
}

const DataAssign = ({ onAssign }: DataAssignProps) => {
  const [selectedName, setSelectedName] = useState<string | undefined>();
  const [searchCondition, setCondition] = useState<Option[]>([
    {
      name: '검색어 선택',
      value: '',
    },
  ]);

  useEffect(() => {
    setCondition([]);
  }, []);

  return (
    <Row className="mx-2">
      {searchCondition.length > 1 ? (
        <Col md={4}>
          <Row>
            <Col md={5}>
              <label className="form-label mt-2">
                <strong>생성 조건</strong>
              </label>
            </Col>
            <Col md={7}>
              <Select
                id={'searchData'}
                name={'searchData'}
                options={searchCondition}
                onChange={(e) => {
                  const selectedIndex = e.target.selectedIndex;
                  const value = e.target.options[selectedIndex].value;
                  if (value) {
                    setSelectedName(value);
                  } else {
                    setSelectedName(undefined);
                  }
                }}
              />
            </Col>
          </Row>
        </Col>
      ) : null}
      <Col md={4}>
        <Button variant="dark" onClick={() => onAssign(selectedName)}>
          데이터 할당 받기
        </Button>
      </Col>
    </Row>
  );
};

export default DataAssign;
