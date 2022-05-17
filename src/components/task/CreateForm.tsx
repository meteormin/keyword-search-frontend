import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import Prototype from './Prototype';
import WorkSpace from './WorkSpace';
import { lang } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import taskModule from '../../store/features/task';
import sentenceModule from '../../store/features/sentence';
import { CreateSentence } from '../../store/features/sentence/sentenceAction';

export interface CreateFormProps {
  show: boolean;
  time: string;
}

const CreateForm = (props: CreateFormProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('03:00:00');

  // 원본
  const [sentence1, setSentence1] = useState('');
  const [sentence2, setSentence2] = useState('');
  // API 결과
  const [sentence1Pat, setSentence1Pat] = useState('');
  const [sentence2Pat, setSentence2Pat] = useState('');

  // 사용자 수정 결과
  const [sentence1Mod, setSentence1Mod] = useState('');
  const [sentence2Mod, setSentence2Mod] = useState('');

  const { workTask } = useSelector(taskModule.getTaskState);

  useEffect(() => {
    setShow(props.show);
    setTime(props.time);
  }, [props, workTask]);

  return (
    <Fragment>
      <Modal
        size="xl"
        show={show}
        onHide={() => {
          setShow(false);
          dispatch(taskModule.actions.setWorkTask(null));
        }}
        centered
      >
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
                <WorkSpace
                  onSubmit={(data) => {
                    if (workTask) {
                      const createSentence: CreateSentence = {
                        taskId: workTask.id,
                        sentence_1: data.textArea10,
                        sentence_2: data.textArea20,
                        sentence1Patterned: data.origin[0],
                        sentence2Patterned: data.origin[1],
                        sentence1PatternedModified: data.textArea11,
                        sentence2PatternedModified: data.textArea21,
                      };
                      dispatch(
                        sentenceModule.actions.createSentence(createSentence),
                      );
                      dispatch(taskModule.actions.setWorkTask(null));
                      setShow(false);
                    }
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CreateForm;
