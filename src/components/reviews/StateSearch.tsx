import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import { ReviewStatus } from '../../store/features/search/searchAction';
import { config } from '../../helpers';

export interface StateSearchState {
  create?: string;
  review?: ReviewStatus;
  reject?: number;
}

export interface StateSearchProps {
  onChange: (state: StateSearchState) => any;
}

const StateSearch = (props: StateSearchProps) => {
  // const [create, setCreate] = useState<string | undefined>();
  const [review, setReview] = useState<ReviewStatus | undefined>();
  const [reject, setReject] = useState<number | undefined>();

  useEffect(() => {
    props.onChange({
      review,
      reject,
    });
  }, [reject, review]);

  return (
    <Row className="mx-2">
      <Col md={4}>
        <SelectFilter
          label={'검수 상태'}
          onChange={(selectedValue) => {
            setReview(selectedValue);
          }}
          options={config.selectOptions.ReviewState}
        />
      </Col>
      <Col md={4}>
        <SelectFilter
          label={'반려 사유'}
          onChange={(selectedValue) => {
            setReject(selectedValue as number);
          }}
          options={config.selectOptions.RejectReason}
        />
      </Col>
    </Row>
  );
};

export default StateSearch;
