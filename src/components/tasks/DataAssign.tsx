import React, { useEffect, useState } from 'react';
import Select, { Option } from '../common/Select';
import { Button, Col, Row } from 'react-bootstrap';
import Timer from '../common/Timer';
import { config } from '../../helpers';

export interface DataAssignProps {
  onAssign: (selectedName: string) => any;
  time: string;
}

export interface DataAssignState {
  _searchName: Option[];
  _searchValue: string;
  _selectedName: string | number;
}

const DataAssign = ({ onAssign, time }: DataAssignProps) => {
  const [selectedName, setSelectedName] = useState<string>('검색어 선택');
  const [searchCondition, setCondition] = useState<Option[]>([
    {
      name: '검색어 선택',
      value: '',
    },
  ]);

  useEffect(() => {
    setCondition(config.selectOptions.CreateConditions);
  });

  return (
    <Row className="mx-2">
      <Col md={4}>
        <Row>
          <Col md={4}>
            <label className="form-label mt-2">
              <strong>생성 조건</strong>
            </label>
          </Col>
          <Col md={8}>
            <Select
              id={'searchData'}
              name={'searchData'}
              options={searchCondition}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                setSelectedName(e.target.options[selectedIndex].value);
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <Button variant="dark" onClick={() => onAssign(selectedName)}>
          데이터 할당 받기
        </Button>
      </Col>
      <Col md={4} className="">
        <Timer time={time} />
      </Col>
    </Row>
  );
};

export default DataAssign;
