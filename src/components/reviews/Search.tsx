import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Button, Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from './DateSearch';
import IdSearch from './IdSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
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
    const newParameter = { ...parameters, ...state };
    dispatch(searchModule.actions.search(newParameter));
  };
  return (
    <Fragment>
      <Row>
        <DataSearch
          onSearch={(state) => {
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
        <IdSearch
          onChange={(state) => {
            console.log('Id search', state);
            setSearchParameter(state);
          }}
        />
      </Row>
      <Row className="mt-4">
        <StateSearch
          onChange={(state) => {
            console.log('state search', state);
            setSearchParameter({
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
        <Col>
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
        <Col>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            {seq}차 승인
            <br />
            {stats.pass}건
          </Button>
        </Col>
        <Col>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
            {seq}차 반려 중
            <br />
            {stats.reject}건
          </Button>
        </Col>
        <Col>
          <Button
            style={{ cursor: 'default' }}
            variant="light"
            className="w-100"
          >
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
