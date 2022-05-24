import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from './DateSearch';
import IdSearch from './IdSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../store/features/search/searchAction';
import { date } from '../../helpers';

export interface SearchStats {
  all: number;
  pass: number;
  reject: number;
  totalReject: number;
}

export interface SearchProps {
  seq: number;
  stats: SearchStats;
  onSearch?: () => any;
  onReset?: () => any;
}

const Search = ({ seq, stats, onSearch, onReset }: SearchProps) => {
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
        <IdSearch
          onChange={(state) => {
            console.log(state);
          }}
        />
      </Row>
      <Row className="mt-4">
        <StateSearch
          onChange={(state) => {
            console.log(state);
            setSearchParameter({
              reviewStatus: state.review,
              rejectReason: state.reject,
            });
          }}
        />
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
