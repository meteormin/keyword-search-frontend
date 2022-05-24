import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from '../reviews/DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import {
  SearchParameter,
  SearchState,
} from '../../store/features/search/searchAction';
import { date } from '../../helpers';

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
  onSearch?: () => any;
  onReset?: () => any;
}

const Search = ({ stats, onSearch, onReset }: SearchProps) => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);

  const setSearchParameter = (state: SearchParameter) => {
    dispatch(searchModule.actions.search(Object.assign(state, parameters)));
  };

  return (
    <Fragment>
      <Row>
        <DataSearch
          onSearch={(selectedName, searchValue) => {
            console.log(selectedName, searchValue);
            // setSearchParameter(state)
            if (onSearch) {
              onSearch();
            }
          }}
          onReset={() => {
            if (onReset) {
              onReset();
            }
          }}
        />
      </Row>
      <Row className="mt-4">
        <StateSearch onChange={(state) => console.log(state)} />
      </Row>
      <Row className="mt-4">
        <DateSearch
          onChange={(state) =>
            setSearchParameter({
              createdAtStart: date(state.startCreatedAt).utc().format(),
              createdAtEnd: date(state.endCreatedAt).utc().format(),
              reviewedAtStart: date(state.startReviewAt).utc().format(),
              reviewedAtEnd: date(state.endReviewAt).utc().format(),
            })
          }
        />
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
