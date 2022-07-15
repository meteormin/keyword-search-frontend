import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from './DateSearch';
import IdSearch from './IdSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
import SearchAndReset from '../common/SearchAndReset';

export interface SearchProps {
  onSearch: () => any;
}

const Search = ({ onSearch }: SearchProps) => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);

  const setSearchParameter = (state: SearchParameter) => {
    dispatch(searchModule.actions.search(state));
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
              setSearchParameter(state);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <StateSearch
            onChange={(state) => {
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
            onChange={(params) => {
              const dateParameters: SearchParameter = {};
              dateParameters.createdAtStart = params.createAt.start;
              dateParameters.createdAtEnd = params.createAt.end;

              dateParameters.reviewedAtStart = params.reviewAt.start;
              dateParameters.reviewedAtEnd = params.reviewAt.end;

              setSearchParameter(dateParameters);
            }}
            createAtFilter={true}
            reviewAtFilter={true}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Search;
