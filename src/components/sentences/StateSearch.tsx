import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import {
  CreateStatus,
  ReviewStatus,
} from '../../store/features/search/searchAction';
import { config } from '../../helpers';

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
            if (selectedValue) {
              setCreate(selectedValue as CreateStatus);
            }
          }}
          options={config.selectOptions.CreateState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'검수 상태'}
          onChange={(selectedValue) => {
            if (selectedValue) {
              setReview(selectedValue as ReviewStatus);
            }
          }}
          options={config.selectOptions.ReviewState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'반려 사유'}
          onChange={(selectedValue) => {
            if (parseInt(selectedValue)) {
              setReject(parseInt(selectedValue));
            }
          }}
          options={config.selectOptions.RejectReason}
        />
      </Col>
    </Row>
  );
};

export default StateSearch;
