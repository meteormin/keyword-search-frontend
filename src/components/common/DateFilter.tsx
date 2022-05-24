import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

export interface DateFilterState {
  start: Date;
  end: Date;
}

export interface DateFilterProps {
  label: string;
  onChange: (state: DateFilterState) => any;
}

const DateFilter = (props: DateFilterProps) => {
  const now = new Date();
  const monthAgo = new Date(now);
  monthAgo.setMonth(now.getMonth() - 1);

  const [start, setStart] = useState<Date>(monthAgo);
  const [end, setEnd] = useState<Date>(now);

  useEffect(() => {
    props.onChange({
      start,
      end,
    });
  }, [start, end]);

  return (
    <Row>
      <Col md={3}>
        <label className="form-label mt-2">
          <strong>{props.label}</strong>
        </label>
      </Col>
      <Col md={4}>
        <DatePicker
          className="form-control w-100"
          locale="ko"
          id="startC"
          selected={start}
          dateFormat="yyyy.MM.dd"
          onChange={(date: Date) => setStart(date)}
        />
      </Col>
      <Col md={1} className="text-center">
        <span className="text-center">~</span>
      </Col>
      <Col md={4}>
        <DatePicker
          className="form-control w-100"
          locale="ko"
          id="endC"
          selected={end}
          dateFormat="yyyy.MM.dd"
          onChange={(date: Date) => setEnd(date)}
        />
      </Col>
    </Row>
  );
};

export default DateFilter;
