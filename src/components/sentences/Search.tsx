import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from '../reviews/DateSearch';

export interface SearchStats {
  all: number;
  wait: number;
  first: number;
  second: number;
  rejectFirst: number;
  rejectSecond: number;
}

export interface SearchProps {
  stats: SearchStats;
}

const Search = ({ stats }: SearchProps) => {
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
        <StateSearch onChange={(state) => console.log(state)} />
      </Row>
      <Row className="mt-4">
        <DateSearch onChange={(state) => console.log(state)} />
      </Row>
      <Row className="mt-4">
        <Col lg={2}>
          <Button variant="light" className="w-100">
            전체 목록
            <br />
            {stats.all}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button variant="light" className="w-100">
            검수 대기
            <br />
            {stats.wait}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button variant="light" className="w-100">
            1차 승인
            <br />
            {stats.first}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button variant="light" className="w-100">
            1차 반려
            <br />
            {stats.rejectFirst}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button variant="light" className="w-100">
            2차 승인
            <br />
            {stats.second}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button variant="light" className="w-100">
            2차 반려
            <br />
            {stats.rejectSecond}건
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Search;
