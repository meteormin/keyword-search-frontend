import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import Prototype from './Prototype';
import WorkSpace from './WorkSpace';
import { lang } from '../../helpers';
import { useSelector } from 'react-redux';
import { Task } from '../../store/features/sentence/sentenceAction';
import sentenceModule from '../../store/features/sentence';

export interface CreateFormProps {
  show: boolean;
  time: string;
}

const CreateForm = (props: CreateFormProps) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('03:00:00');
  const { workTask } = useSelector(sentenceModule.getSentenceState);

  useEffect(() => {
    setShow(props.show);
    setTime(props.time);
  }, [props, workTask]);

  return (
    <Fragment>
      <Modal size="xl" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Container className="mt-2">
            <Row>
              <Col lg={4} className="mt-2">
                <Button variant="dark">현재 상태 저장</Button>
                <Button
                  variant="dark"
                  className="ms-2"
                  onClick={() => {
                    window.open(
                      lang.sentence.workSpace.dictLink,
                      'new',
                      'toolbar=yes, menubar=yes, scrollbar=yes, resizeable=yes, width=' +
                        screen.width / 3 +
                        ', height=' +
                        screen.height +
                        ', left=0, top=0',
                    );
                  }}
                >
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
                  concepts={workTask?.concepts.map((t) => t.stem) || []}
                  conceptsTag={workTask?.concepts.map((t) => t.posttag) || []}
                  wordCount={workTask?.posLength || 0}
                  basicSentence={workTask?.sentence || ''}
                  prototypeSentence={workTask?.tagged || ''}
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
