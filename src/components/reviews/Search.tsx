import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from './DateSearch';
import IdSearch from './IdSearch';

export interface SearchStats {
  all: number;
  pass: number;
  reject: number;
  totalReject: number;
}

export interface SearchProps {
  seq: number;
  stats: SearchStats;
}

const Search = ({ seq, stats }: SearchProps) => {
  return (
    <Fragment>
      <Row>
        <DataSearch
          onSearch={(selectedName, searchValue) =>
            console.log(selectedName, searchValue)
          }
          onReset={() => null}
        />
      </Row>
      <Row className="mt-4">
        <IdSearch
          onChange={(state) => {
            console.log(state);
          }}
        />
      </Row>
      <Row className="mt-4">
        <StateSearch onChange={(state) => console.log(state)} />
      </Row>
      <Row className="mt-4">
        <DateSearch onChange={(state) => console.log(state)} />
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="light" className="w-100">
            전체 목록
            <br />
            {stats.all}건
          </Button>
        </Col>
        <Col>
          <Button variant="light" className="w-100">
            {seq}차 승인
            <br />
            {stats.pass}건
          </Button>
        </Col>
        <Col>
          <Button variant="light" className="w-100">
            {seq}차 반려 중
            <br />
            {stats.reject}건
          </Button>
        </Col>
        <Col>
          <Button variant="light" className="w-100">
            {seq}차 반려(누적)
            <br />
            {stats.totalReject}건
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Search;
