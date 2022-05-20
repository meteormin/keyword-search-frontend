import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from './Input';

export interface InputFilter {
  label: string;
  onChange: (value: string) => any;
}

const InputFilter = (props: InputFilter) => {
  const [value, setValue] = useState('');
  return (
    <Row>
      <Col md={4}>
        <label className="form-label mt-2">
          <strong>{props.label}</strong>
        </label>
      </Col>
      <Col md={8}>
        <Input
          id={'inputFilter'}
          name={'inputFilter'}
          onChange={(e) => {
            props.onChange(e.target.value);
            setValue(e.target.value);
          }}
          type="text"
          value={value}
        />
      </Col>
    </Row>
  );
};

export default InputFilter;
