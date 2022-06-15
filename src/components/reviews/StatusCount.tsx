import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export interface StatusCountProps {
  seq: number;
  all: number;
  pass: number;
  reject: number;
  totalReject: number;
}

const StatusCount = (props: StatusCountProps) => {
  return (
    <Row className="mt-4">
      <Col>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          전체 목록
          <br />
          {props.all}건
        </Button>
      </Col>
      <Col>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          {props.seq}차 승인
          <br />
          {props.pass}건
        </Button>
      </Col>
      <Col>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          {props.seq}차 반려 중
          <br />
          {props.reject}건
        </Button>
      </Col>
      <Col>
        <Button style={{ cursor: 'default' }} variant="light" className="w-100">
          {props.seq}차 반려(누적)
          <br />
          {props.totalReject}건
        </Button>
      </Col>
    </Row>
  );
};

export default StatusCount;
