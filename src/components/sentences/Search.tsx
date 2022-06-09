import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from '../reviews/DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
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
    const newParameter = { ...parameters, ...state };
    dispatch(searchModule.actions.search(newParameter));
  };

  return (
    <Fragment>
      <Row>
        <DataSearch
          onSearch={(state) => {
            console.log(state);
            setSearchParameter({
              refID: state.refId,
              domain: state.domain,
            });
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
        <StateSearch
          onChange={(state) => {
            console.log(state);
            setSearchParameter({
              createStatus: state.create,
              reviewStatus: state.review,
              rejectReason: state.reject,
            });
          }}
        />
      </Row>
      <Row className="mt-4">
        <DateSearch
          onChange={(state) => {
            const dateParameters: SearchParameter = {};
            if (state.startCreatedAt && state.endCreatedAt) {
              dateParameters.createdAtStart = date(
                state.startCreatedAt,
              ).format();
              dateParameters.createdAtEnd = date(state.endCreatedAt)
                .add(1, 'days')
                .format();
            }

            if (state.startReviewAt && state.endReviewAt) {
              dateParameters.reviewedAtStart = date(
                state.startReviewAt,
              ).format();
              dateParameters.reviewedAtEnd = date(state.endReviewAt)
                .add(1, 'days')
                .format();
            }

            setSearchParameter(dateParameters);
          }}
        />
      </Row>
      <Row className="mt-4">
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            전체 목록
            <br />
            {stats.all}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            검수 대기
            <br />
            {stats.wait}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            1차 승인
            <br />
            {stats.first}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            1차 반려
            <br />
            {stats.rejectFirst}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            2차 승인
            <br />
            {stats.second}건
          </Button>
        </Col>
        <Col lg={2}>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
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
