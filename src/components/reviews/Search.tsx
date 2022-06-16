import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from './DateSearch';
import IdSearch from './IdSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
import { date } from '../../helpers';
import SearchAndReset from '../common/SearchAndReset';
import reviewModule from '../../store/features/reviews';

export interface SearchStats {
  all: number;
  pass: number;
  reject: number;
  totalReject: number;
}

export interface SearchProps {
  onSearch: () => any;
}

const Search = ({ onSearch }: SearchProps) => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);
  const setSearchParameter = (state: SearchParameter) => {
    const newParameter = { ...parameters, ...state };
    dispatch(searchModule.actions.search(newParameter));
  };
  const resetSearchData = () => {
    dispatch(searchModule.actions.search(null));
  };
  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <DataSearch
            onChange={(state) => {
              setSearchParameter({
                refID: state.refId,
                domain: state.domain,
                concept: state.concept,
              });
            }}
            defaultState={{
              refId: parameters?.refID,
              domain: parameters?.domain,
              concept: parameters?.concept,
            }}
          />
        </Col>
        <Col>
          <SearchAndReset onSearch={onSearch} onReset={resetSearchData} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <IdSearch
            onChange={(state) => {
              console.log('Id search', state);
              setSearchParameter(state);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <StateSearch
            onChange={(state) => {
              console.log('state search', state);
              setSearchParameter({
                reviewStatus: state.review,
                rejectReason: state.reject,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
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
            createAtFilter={true}
            reviewAtFilter={true}
          />
        </Col>
        {/*<Col md={4}>*/}
        {/*  <SearchAndReset*/}
        {/*    onSearch={() => onSearch()}*/}
        {/*    onReset={() => resetSearchData()}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
    </Fragment>
  );
};

export default Search;
