import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ko from 'date-fns/locale/ko';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateFilter from '../common/DateFilter';
import { date, str } from '../../helpers';

registerLocale('ko', ko);

export interface DateSearchState {
  startCreatedAt: Date | null;
  endCreatedAt: Date | null;
  startReviewAt: Date | null;
  endReviewAt: Date | null;
}

export interface DateSearchParameters {
  createAt: {
    start?: string;
    end?: string;
  };
  reviewAt: {
    start?: string;
    end?: string;
  };
}

export interface DateSearchProps {
  createAtFilter: boolean;
  reviewAtFilter: boolean;
  onChange: (state: DateSearchParameters) => any;
}

const DateSearch = (props: DateSearchProps) => {
  const [startCreatedAt, setStartCreatedAt] = useState<Date | null>(null);
  const [endCreatedAt, setEndCreatedAt] = useState<Date | null>(null);
  const [startReviewAt, setStartReviewAt] = useState<Date | null>(null);
  const [endReviewAt, setEndReviewAt] = useState<Date | null>(null);

  const format = (state: DateSearchState) => {
    let createAt: { start?: string; end?: string } = {
      start: undefined,
      end: undefined,
    };
    let reviewAt: { start?: string; end?: string } = {
      start: undefined,
      end: undefined,
    };

    if (state.startCreatedAt && state.endCreatedAt) {
      createAt = str.searchFormat(
        date(state.startCreatedAt),
        date(state.endCreatedAt),
      );
    }

    if (state.startReviewAt && state.endReviewAt) {
      reviewAt = str.searchFormat(
        date(state.startReviewAt),
        date(state.endReviewAt),
      );
    }

    return {
      createAt,
      reviewAt,
    };
  };

  useEffect(() => {
    props.onChange(
      format({
        startCreatedAt,
        endCreatedAt,
        startReviewAt,
        endReviewAt,
      }),
    );
  }, [startCreatedAt, endCreatedAt, startReviewAt, endReviewAt]);

  const createAtFilter = () => {
    return (
      <Fragment>
        <Col md={props.reviewAtFilter ? '5' : 'auto'}>
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
      </Fragment>
    );
  };

  const reviewAtFilter = () => {
    return (
      <Fragment>
        <Col md={props.createAtFilter ? '5' : 'auto'}>
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
        <Col md={1}></Col>
      </Fragment>
    );
  };

  return (
    <Row className="mx-2">
      {props.createAtFilter ? createAtFilter() : null}
      {props.reviewAtFilter ? reviewAtFilter() : null}
    </Row>
  );
};

export default DateSearch;
