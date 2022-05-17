import React, { Fragment, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Card from '../common/Card';
import { lang } from '../../helpers';

export interface WorkData {
  textArea10: string;
  textArea11: string;
  textArea20: string;
  textArea21: string;
  origin: string[];
}

export interface WorkSpaceProps {
  onSubmit: (data: WorkData) => any;
}

const WorkSpace = ({ onSubmit }: WorkSpaceProps) => {
  const [textArea10, setText10] = useState('');
  const [textArea20, setText20] = useState('');
  const [textArea11, setText11] = useState('');
  const [textArea21, setText21] = useState('');
  const [patternedText, setPatText] = useState<string[]>(['temp', 'temp2']);

  const handleChange = (id: number, v: string) => {
    switch (id) {
      case 10:
        setText10(v);
        break;
      case 11:
        setText11(v);
        break;
      case 20:
        setText20(v);
        break;
      case 21:
        setText21(v);
        break;
      default:
        break;
    }
  };

  const handleBtnClick = (no: number) => {
    if (no === 0) {
      setText11(patternedText[no]);
    } else if (no === 1) {
      setText21(patternedText[no]);
    }
  };

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
            <Form.Control
              as="textarea"
              placeholder="문장1"
              value={textArea10}
              onChange={(e) => {
                handleChange(10, e.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
        <Col lg={2} className="mt-2">
          <Button
            variant="light"
            style={{ fontSize: '0.85em' }}
            onClick={() => {
              console.log('get api');
              handleBtnClick(0);
            }}
          >
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <FloatingLabel label="문장1" controlId="floatingTextarea">
            <Form.Control
              as="textarea"
              placeholder="문장1"
              value={textArea11}
              onChange={(e) => {
                handleChange(11, e.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={5}>
          <FloatingLabel label="문장2" controlId="floatingTextarea">
            <Form.Control
              as="textarea"
              placeholder="문장2"
              value={textArea20}
              onChange={(e) => {
                handleChange(20, e.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
        <Col lg={2} className="mt-2">
          <Button
            variant="light"
            style={{ fontSize: '0.85em' }}
            onClick={() => {
              console.log('get api');
              handleBtnClick(1);
            }}
          >
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <FloatingLabel label="문장2" controlId="floatingTextarea">
            <Form.Control
              as="textarea"
              placeholder="문장2"
              value={textArea21}
              onChange={(e) => {
                handleChange(21, e.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-xxl-5 mx-0">
        <Button
          variant="warning"
          onClick={() =>
            onSubmit({
              origin: patternedText,
              textArea10: textArea10,
              textArea11: textArea11,
              textArea20: textArea20,
              textArea21: textArea21,
            })
          }
        >
          검수 요청
        </Button>
      </Row>
    </Fragment>
  );
};

export default WorkSpace;
