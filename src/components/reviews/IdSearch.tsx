import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import IdState from './IdState';
import Input from '../common/Input';

export interface IdSearchState {
  selected: string;
  value: string;
}

export interface IdSearchProps {
  onChange: (state: IdSearchState) => any;
}

const IdSearch = (props: IdSearchProps) => {
  const [selected, setSelected] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    props.onChange({
      selected,
      value,
    });
  }, [selected, value]);

  return (
    <Row className="mx-2">
      <Col md={4}>
        <SelectFilter
          label={'ID'}
          onChange={(selectedValue) => {
            setSelected(selectedValue as string);
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
