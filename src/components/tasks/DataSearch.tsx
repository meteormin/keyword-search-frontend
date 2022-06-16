import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from '../common/Select';
import { config } from '../../helpers';

export interface DataSearchProps {
  onChange: (state: SearchName) => any;
  defaultState: SearchName;
}

export interface SearchName {
  concept?: string;
  refId?: number;
  domain?: string;
}

export enum SearchNames {
  NONE,
  CONCEPT,
  REF_ID,
  DOMAIN,
}

const DataSearch = (props: DataSearchProps) => {
  const [selectedName, setSelectedName] = useState<SearchNames | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const searchNames = config.selectOptions.DataSearchNames;

  const getState = () => {
    const state: SearchName = {
      concept: undefined,
      refId: undefined,
      domain: undefined,
    };

    switch (selectedName) {
      case SearchNames.CONCEPT:
        state.concept = searchValue;
        break;
      case SearchNames.REF_ID:
        if (searchValue) {
          state.refId = parseInt(searchValue);
        }
        break;
      case SearchNames.DOMAIN:
        state.domain = searchValue;
        break;
      case SearchNames.NONE:
      default:
        break;
    }

    return state;
  };

  useEffect(() => {
    const state = props.defaultState;

    if (state.domain) {
      setSelectedName(SearchNames.DOMAIN);
      setSearchValue(state.domain);
    }

    if (state.refId) {
      setSelectedName(SearchNames.REF_ID);
      setSearchValue(state.refId.toString());
    }

    if (state.concept) {
      setSelectedName(SearchNames.CONCEPT);
      setSearchValue(state.concept);
    }
  }, []);

  useEffect(() => {
    props.onChange(getState());
  }, [searchValue]);

  return (
    <Row className="mx-2">
      <Col md={4}>
        <Row>
          <Col md={5}>
            <label className="form-label mt-2">
              <strong>데이터</strong>
            </label>
          </Col>
          <Col md={7}>
            <Select
              id={'searchData'}
              name={'searchData'}
              options={searchNames}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                const value = e.target.options[selectedIndex].value;
                if (value) {
                  setSelectedName(parseInt(value) as SearchNames);
                }
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <input
          type={'text'}
          className="form-control w-100"
          id={'searchValue'}
          name={'searchValue'}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="검색어를 입력해 주세요."
        />
      </Col>
    </Row>
  );
};

export default DataSearch;
