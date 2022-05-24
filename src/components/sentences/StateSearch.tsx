import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import CreateState from './CreateState';
import RejectReason from './RejectReason';
import ReviewState from './ReviewState';
import {
  CreateStatus,
  ReviewStatus,
} from '../../store/features/search/searchAction';

export interface StateSearchState {
  create?: CreateStatus;
  review?: ReviewStatus;
  reject?: number;
}

export interface StateSearchProps {
  onChange: (state: StateSearchState) => any;
}

const StateSearch = (props: StateSearchProps) => {
  const [create, setCreate] = useState<CreateStatus>();
  const [review, setReview] = useState<ReviewStatus>();
  const [reject, setReject] = useState<number>();

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
            setCreate(selectedValue as CreateStatus);
          }}
          options={CreateState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'검수 상태'}
          onChange={(selectedValue) => {
            setReview(selectedValue as ReviewStatus);
          }}
          options={ReviewState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'반려 사유'}
          onChange={(selectedValue) => {
            setReject(selectedValue as number);
          }}
          options={RejectReason}
        />
      </Col>
    </Row>
  );
};

export default StateSearch;
