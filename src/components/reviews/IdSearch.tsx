import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import { IdStateEnum } from './IdState';
import Input from '../common/Input';
import { config } from '../../helpers';

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
  const [selected, setSelected] = useState<number | undefined>();
  const [value, setValue] = useState<string | undefined>();

  const onChange = () => {
    const idSearchState: IdSearchState = {
      sentenceGroupName: undefined,
      sentenceUserID: undefined,
      review1UserID: undefined,
      review2UserID: undefined,
    };
    if (selected && value) {
      console.log(parseInt(selected.toString()));
      switch (parseInt(selected.toString())) {
        case IdStateEnum.GROUP_NAME:
          idSearchState.sentenceGroupName = value;
          break;
        case IdStateEnum.CREATOR_ID:
          console.log('is??');
          idSearchState.sentenceUserID = value;
          break;
        case IdStateEnum.REVIEWER1_ID:
          idSearchState.review1UserID = value;
          break;
        case IdStateEnum.REVIEWER2_ID:
          idSearchState.review2UserID = value;
          break;
        default:
          break;
      }
    }
    props.onChange(idSearchState);
  };

  useEffect(() => {
    onChange();
  }, [selected, value]);

  return (
    <Row className="mx-2">
      <Col md={5}>
        <SelectFilter
          label={'ID'}
          value={selected}
          onChange={(selectedValue) => {
            setSelected(selectedValue as number);
          }}
          options={config.selectOptions.IdState}
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
          onBlur={onChange}
        />
      </Col>
    </Row>
  );
};

export default IdSearch;
