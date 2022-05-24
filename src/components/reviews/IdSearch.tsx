import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import IdState, { IdStateEnum } from './IdState';
import Input from '../common/Input';

export interface IdSearchState {
  sentenceGroupName?: string;
  sentenceUserID?: string;
  review1UserID?: string;
  review2UserID?: string;
}

export interface IdSearchProps {
  onChange: (state: IdSearchState) => any;
}

const IdSearch = (props: IdSearchProps) => {
  const [selected, setSelected] = useState<IdStateEnum | undefined>();
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    const state: IdSearchState = {
      sentenceGroupName: undefined,
      sentenceUserID: undefined,
      review1UserID: undefined,
      review2UserID: undefined,
    };

    switch (selected) {
      case IdStateEnum.GROUP_NAME:
        state.sentenceGroupName = value;
        break;
      case IdStateEnum.CREATOR_ID:
        state.sentenceUserID = value;
        break;
      case IdStateEnum.REVIEWER1_ID:
        state.review1UserID = value;
        break;
      case IdStateEnum.REVIEWER2_ID:
        state.review2UserID = value;
        break;
      default:
        break;
    }

    props.onChange(state);
  }, [selected, value]);

  return (
    <Row className="mx-2">
      <Col md={4}>
        <SelectFilter
          label={'ID'}
          onChange={(selectedValue) => {
            setSelected(selectedValue as IdStateEnum);
          }}
          options={IdState}
        />
      </Col>
      <Col md={4}>
        <Input
          type={'text'}
          id={'searchId'}
          name={'searchId'}
          value={value}
          placeholder={'검색어를 입려해 주세요.'}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Col>
      <Col md={4}></Col>
    </Row>
  );
};

export default IdSearch;
