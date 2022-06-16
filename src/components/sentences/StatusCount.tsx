import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export interface StatusCountProps {
  all: number;
  wait: number;
  first: number;
  second: number;
  rejectFirst: number;
  rejectSecond: number;
}

const StatusCount = (props: StatusCountProps) => {
  return (
    <Row className="mt-4">
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          전체 목록
          <br />
          {props.all}건
        </Button>
      </Col>
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          검수 대기
          <br />
          {props.wait}건
        </Button>
      </Col>
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          1차 승인
          <br />
          {props.first}건
        </Button>
      </Col>
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          1차 반려
          <br />
          {props.rejectFirst}건
        </Button>
      </Col>
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          2차 승인
          <br />
          {props.second}건
        </Button>
      </Col>
      <Col lg={2}>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          2차 반려
          <br />
          {props.rejectSecond}건
        </Button>
      </Col>
    </Row>
  );
};

export default StatusCount;
