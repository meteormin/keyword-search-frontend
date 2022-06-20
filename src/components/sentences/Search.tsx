import React, { Fragment } from 'react';
import DataSearch from '../tasks/DataSearch';
import { Col, Row } from 'react-bootstrap';
import StateSearch from './StateSearch';
import DateSearch from '../reviews/DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
import { date } from '../../helpers';
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
      </Row>
    </Fragment>
  );
};

export default Search;
