import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Prototype from '../common/Prototype';
import WorkSpace, { WorkData } from '../common/WorkSpace';
import { lang } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import taskModule from '../../store/features/tasks';
import sentenceModule from '../../store/features/sentence';
import {
  CreateSentence,
  Sentence,
} from '../../utils/nia15/interfaces/sentences';
import { Task } from '../../utils/nia15/interfaces/tasks';
import { sentenceToWorkData } from '../../pages/sentences/sentenceDataMap';
import { sentenceValidate } from '../../utils/validation/sentence';
import alertModal from '../../store/features/common/alertModal';
import Timer from '../../components/common/Timer';

export interface CreateFormProps {
  show: boolean;
  readOnly?: boolean;
  onCreate: () => any;
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

  // 단어 수
  const [sentence1Count, setCount1] = useState(0);
  const [sentence2Count, setCount2] = useState(0);

  const [task, setTask] = useState<Task | null>(null);
  const [sentence, setSentence] = useState<Sentence | null>(null);

  const [method, setMethod] = useState<'create' | 'edit'>('create');
  const { workTask } = useSelector(taskModule.getTaskState);
  const { editSentence, createSentence } = useSelector(
    sentenceModule.getSentenceState,
  );

  useEffect(() => {
    setShow(props.show);
    setTime(props.time);

    if (workTask) {
      setTask(workTask);
    }

    if (editSentence) {
      setMethod('edit');
      setSentence(editSentence);
      setTask(editSentence.edges?.task || null);
    }

    makeTagged().then((tempTask) => {
      if (tempTask) {
        setTask(tempTask);
      }
    });
  }, [props, workTask, editSentence]);

  const makeTagged = async () => {
    const tempTask = workTask;
    if (!tempTask?.tagged) {
      if (tempTask?.sentence) {
        // tempTask.tagged = (await makeSentencePattern(tempTask)) || '';
      }
    }

    return tempTask;
  };

  const toWorkData = (): WorkData | undefined => {
    if (sentence) {
      return sentenceToWorkData(sentence);
    }
    return undefined;
  };

  const validate = (create: CreateSentence) => {
    const validated = sentenceValidate(task as Task, create);

    if (!validated.status) {
      dispatch(
        alertModal.showAlert({
          title: '문장 생성하기',
          message: validated.messages.toString(),
        }),
      );
    }

    return validated.status;
  };

  return (
    <Fragment>
      <Modal
        centered
        dialogClassName={'modal-80w'}
        show={show}
        onHide={() => {
          setShow(false);
          dispatch(taskModule.actions.setWorkTask(null));
          dispatch(sentenceModule.actions.setSentence(null));
        }}
      >
        <Modal.Header closeButton>
          <Container className="mt-2">
            <Row>
              <Col lg={4} className="mt-2">
                <Button
                  variant="dark"
                  disabled={props.readOnly}
                  onClick={() => {
                    if (createSentence) {
                      dispatch(
                        sentenceModule.actions.createTempSentence(
                          createSentence,
                        ),
                      );
                    } else {
                      dispatch(
                        alertModal.showAlert({
                          title: '임시 저장',
                          message:
                            '입력한 값이 없어, 임시 저장을 할 수 없습니다.',
                        }),
                      );
                    }
                  }}
                >
                  현재 상태 저장
                </Button>
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
                <Timer time={time} />

                <Button
                  variant="light"
                  className="bg-light border h-100"
                  style={{ cursor: 'default' }}
                >
                  생성 가능 개념집합
                </Button>
                <Button
                  variant="light"
                  className="bg-light border h-100"
                  style={{ cursor: 'default' }}
                >
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
                  concepts={task?.edges?.concepts.map((t) => t.stem) || []}
                  conceptsTag={
                    task?.edges?.concepts.map(
                      (t) => `${t.stem}(${t.posttag})`,
                    ) || []
                  }
                  wordCount={task?.posLength || 0}
                  basicSentence={task?.sentence || ''}
                  prototypeSentence={task?.tagged || ''}
                />
              </Col>
              <Col lg={8}>
                <WorkSpace
                  workType={'work'}
                  readOnly={props.readOnly}
                  task={task as Task}
                  workData={toWorkData()}
                  onSubmit={(data) => {
                    if (task) {
                      const createSentence: CreateSentence = {
                        taskId: task.id,
                        sentence1: data.textArea10,
                        sentence2: data.textArea20,
                        sentence1Patterned: data.origin[0],
                        sentence2Patterned: data.origin[1],
                        sentence1PatternedModified: data.textArea11,
                        sentence2PatternedModified: data.textArea21,
                        sentence1Count: data.wordCount1,
                        sentence2Count: data.wordCount2,
                      };

                      if (validate(createSentence)) {
                        dispatch(
                          sentenceModule.actions.createSentence(createSentence),
                        );
                        dispatch(taskModule.actions.setWorkTask(null));
                        setShow(false);
                        props.onCreate();
                      }
                    }
                  }}
                  onChange={(data) => {
                    if (task) {
                      const createSentence: CreateSentence = {
                        taskId: task.id,
                        sentence1: data.textArea10,
                        sentence2: data.textArea20,
                        sentence1Patterned: data.origin[0],
                        sentence2Patterned: data.origin[1],
                        sentence1PatternedModified: data.textArea11,
                        sentence2PatternedModified: data.textArea21,
                        sentence1Count: data.wordCount1,
                        sentence2Count: data.wordCount2,
                      };
                      console.log(createSentence);
                      dispatch(
                        sentenceModule.actions.setCreateSentence(
                          createSentence,
                        ),
                      );
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
