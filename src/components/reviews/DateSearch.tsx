import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ko from 'date-fns/locale/ko';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateFilter from '../common/DateFilter';

registerLocale('ko', ko);

export interface DateSearchState {
  startCreatedAt: Date | null;
  endCreatedAt: Date | null;
  startReviewAt: Date | null;
  endReviewAt: Date | null;
}

export interface DateSearchProps {
  onChange: (state: DateSearchState) => any;
}

const DateSearch = (props: DateSearchProps) => {
  const [startCreatedAt, setStartCreatedAt] = useState<Date | null>(null);
  const [endCreatedAt, setEndCreatedAt] = useState<Date | null>(null);
  const [startReviewAt, setStartReviewAt] = useState<Date | null>(null);
  const [endReviewAt, setEndReviewAt] = useState<Date | null>(null);

  useEffect(() => {
    props.onChange({
      startCreatedAt,
      endCreatedAt,
      startReviewAt,
      endReviewAt,
    });
  }, [startCreatedAt, endCreatedAt, startReviewAt, endReviewAt]);

  return (
    <Row className="mx-2">
      <Col md={5}>
        <DateFilter
          label="생성 일자"
          onChange={(state) => {
            if (state.start && state.end) {
              setStartCreatedAt(state.start);
              setEndCreatedAt(state.end);
            }
          }}
        />
      </Col>
      <Col md={1}></Col>
      <Col md={5}>
        <DateFilter
          label="검수일자"
          onChange={(state) => {
            if (state.start && state.end) {
              setStartReviewAt(state.start);
              setEndReviewAt(state.end);
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default DateSearch;
