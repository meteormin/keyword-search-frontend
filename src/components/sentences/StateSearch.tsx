import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import CreateState from './CreateState';
import RejectReason from './RejectReason';
import ReviewState from './ReviewState';

export interface StateSearchState {
  create: string;
  review: string;
  reject: string;
}

export interface StateSearchProps {
  onChange: (state: StateSearchState) => any;
}

const StateSearch = (props: StateSearchProps) => {
  const [create, setCreate] = useState('');
  const [review, setReview] = useState('');
  const [reject, setReject] = useState('');

  useEffect(() => {
    props.onChange({
      create,
      review,
      reject,
    });
  }, [create, reject, review]);

  return (
    <Row className="mx-2">
      <Col md={4}>
        <SelectFilter
          label={'생성 상태'}
          onChange={(selectedValue) => {
            setCreate(selectedValue as string);
          }}
          options={CreateState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'검수 상태'}
          onChange={(selectedValue) => {
            setReview(selectedValue as string);
          }}
          options={ReviewState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'반려 사유'}
          onChange={(selectedValue) => {
            setReject(selectedValue as string);
          }}
          options={RejectReason}
        />
      </Col>
    </Row>
  );
};

export default StateSearch;
