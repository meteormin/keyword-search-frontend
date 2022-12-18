import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from 'components/common/Input';

export interface InputFilter {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => any;
}

const InputFilter = (props: InputFilter) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props?.value || '');
  }, []);

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
          placeholder={props.placeholder}
        />
      </Col>
    </Row>
  );
};

export default InputFilter;
