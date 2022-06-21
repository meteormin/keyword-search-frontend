import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from '../reviews/DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
import SearchAndReset from '../common/SearchAndReset';

export interface SearchProps {
  onSearch: () => any;
  onReset?: () => any;
}

const Search = ({ onSearch, onReset }: SearchProps) => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);

  const setSearchParameter = (state: SearchParameter | null) => {
    dispatch(searchModule.actions.search(state));
  };

  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <DataSearch
            onChange={(state) => {
              console.log(state);
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
          <SearchAndReset
            onSearch={() => (onSearch ? onSearch() : null)}
            onReset={() => {
              setSearchParameter(null);
              onReset ? onReset() : null;
            }}
          />
        </Col>
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
      </Row>
    </Fragment>
  );
};

export default Search;
