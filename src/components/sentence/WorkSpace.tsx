import React, { Fragment } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import Card from '../common/Card';
import { lang } from '../../helpers';

const WorkSpace = () => {
  return (
    <Fragment>
      <Card header={lang.sentence.workSpace.subject}>
        <p style={{ whiteSpace: 'pre' }}>
          {lang.sentence.workSpace.description}
        </p>
      </Card>
      <Row>
        <Col lg={5}>
          <FloatingLabel label="문장1" controlId="floatingTextarea">
            <Form.Control as="textarea" placeholder="문장1" />
          </FloatingLabel>
        </Col>
        <Col lg={2} className="mt-2">
          <Button variant="light" style={{ fontSize: '0.85em' }}>
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <FloatingLabel label="문장1" controlId="floatingTextarea">
            <Form.Control as="textarea" placeholder="문장1" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={5}>
          <FloatingLabel label="문장2" controlId="floatingTextarea">
            <Form.Control as="textarea" placeholder="문장2" />
          </FloatingLabel>
        </Col>
        <Col lg={2} className="mt-2">
          <Button variant="light" style={{ fontSize: '0.85em' }}>
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <FloatingLabel label="문장1" controlId="floatingTextarea">
            <Form.Control as="textarea" placeholder="문장1" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Button variant="warning">검수 요청</Button>
      </Row>
    </Fragment>
  );
};

export default WorkSpace;
