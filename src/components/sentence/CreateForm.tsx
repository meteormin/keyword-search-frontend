import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import Prototype from './Prototype';
import WorkSpace from './WorkSpace';

export interface CreateFormProps {
  show: boolean;
  time: string;
}

const CreateForm = (props: CreateFormProps) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('03:00:00');

  useEffect(() => {
    setShow(props.show);
    setTime(props.time);
  }, [props]);

  return (
    <Fragment>
      <Modal size="xl" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Container className="mt-2">
            <Row>
              <Col lg={4} className="mt-2">
                <Button variant="dark">현재 상태 저장</Button>
                <Button variant="dark" className="ms-2">
                  우리말 샘 사전
                </Button>
              </Col>
              <Col lg={8} className="text-center">
                <Button variant="light" className="bg-light border">
                  진행 가능 시간
                  <br />
                  <span>{time}</span>
                </Button>

                <Button variant="light" className="bg-light border h-100">
                  생성 가능 개념집합
                </Button>
                <Button variant="light" className="bg-light border h-100">
                  생성 완료 개념집합
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container className="mt-2">
            <Row>
              <Col lg={4}>
                <Prototype
                  concepts={['a', 'b', 'c', 'd']}
                  conceptsTag={['xx', 'vc', 'sab', 'dk']}
                  wordCount={15}
                  basicSentence={'기본 문형'}
                  prototypeSentence={'원천 데이터 문장'}
                />
              </Col>
              <Col lg={8}>
                <WorkSpace />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CreateForm;
