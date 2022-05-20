import { Col, Row } from 'react-bootstrap';
import Select, { Option } from './Select';
import React from 'react';

export interface selectFilterProps {
  label: string;
  onChange: (selectedValue: any) => any;
  options: Option[];
}

const SelectFilter = (props: selectFilterProps) => {
  return (
    <Row>
      <Col md={4}>
        <label className="form-label mt-2">
          <strong>{props.label}</strong>
        </label>
      </Col>
      <Col md={8}>
        <Select
          id={'selectFilter'}
          name={'selectFilter'}
          options={props.options}
          onChange={(e) => {
            const value = e.target.options[e.target.selectedIndex];
            props.onChange(value || '');
          }}
        />
      </Col>
    </Row>
  );
};

export default SelectFilter;
