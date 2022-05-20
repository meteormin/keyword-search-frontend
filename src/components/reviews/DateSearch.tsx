import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import DateFilter from '../common/DateFilter';

registerLocale('ko', ko);

export interface DateSearchState {
  startCreatedAt: Date;
  endCreatedAt: Date;
  startReviewAt: Date;
  endReviewAt: Date;
}

export interface DateSearchProps {
  onChange: (state: DateSearchState) => any;
}

const DateSearch = (props: DateSearchProps) => {
  const [startCreatedAt, setStartCreatedAt] = useState<Date>(new Date());
  const [endCreatedAt, setEndCreatedAt] = useState<Date>(new Date());
  const [startReviewAt, setStartReviewAt] = useState<Date>(new Date());
  const [endReviewAt, setEndReviewAt] = useState<Date>(new Date());

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
            setStartCreatedAt(state.start);
            setEndCreatedAt(state.end);
          }}
        />
      </Col>
      <Col md={1}></Col>
      <Col md={5}>
        <DateFilter
          label="검수일자"
          onChange={(state) => {
            setStartReviewAt(state.start);
            setEndReviewAt(state.end);
          }}
        />
      </Col>
    </Row>
  );
};

export default DateSearch;
