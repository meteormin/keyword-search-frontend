import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Prototype from '../common/Prototype';
import WorkSpace from '../common/WorkSpace';
import { lang } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import reviewModule from '../../store/features/reviews';
import { sentenceToWorkData } from '../../pages/reviews/reviewDataMap';
import {
  CreateSentence,
  Sentence,
} from '../../store/features/sentence/sentenceAction';
import alertModal from '../../store/features/common/alertModal';
import sentenceModule from '../../store/features/sentence';
import taskModule from '../../store/features/tasks';
import { reworkValidate } from '../../utils/validation/sentence';

export interface CreateFormProps {
  show: boolean;
  time: string;
  seq: number;
  readOnly?: boolean;
  onCreate: () => any;
}

const ReviewForm = (props: CreateFormProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('03:00:00');

  // API 결과
  const [sentence1Pat, setSentence1Pat] = useState('');
  const [sentence2Pat, setSentence2Pat] = useState('');

  // 단어 수
  const [sentence1Count, setCount1] = useState(0);
  const [sentence2Count, setCount2] = useState(0);

  const { editSentence } = useSelector(sentenceModule.getSentenceState);

  const [review, setReview] = useState<Sentence | null>(null);

  const validate = (create: CreateSentence) => {
    const validated = reworkValidate(review as Sentence, create);
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

  useEffect(() => {
    setShow(props.show);
    setTime(props.time);

    if (editSentence) {
      setReview(editSentence);
    }
  }, [props, editSentence]);

  return (
    <Fragment>
      <Modal
        dialogClassName={'modal-80w'}
        show={show}
        onHide={() => {
          setShow(false);
          dispatch(reviewModule.actions.setAssign(null));
        }}
        centered
      >
        <Modal.Header closeButton>
          <Container className="mt-2">
            <Row>
              <Col lg={4} className="mt-2">
                <Button variant="dark" disabled={props.readOnly}>
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
                <Button
                  variant="light"
                  className="bg-light border"
                  style={{ cursor: 'default' }}
                >
                  진행 가능 시간
                  <br />
                  <span>{time}</span>
                </Button>

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
                  concepts={
                    review?.edges?.task?.edges?.concepts?.map((t) => t.stem) ||
                    []
                  }
                  conceptsTag={
                    review?.edges?.task?.edges?.concepts?.map(
                      (t) => `${t.stem}(${t.posttag})`,
                    ) || []
                  }
                  wordCount={review?.edges?.task?.posLength || 0}
                  basicSentence={review?.edges?.task?.sentence || ''}
                  prototypeSentence={review?.edges?.task?.tagged || ''}
                />
              </Col>
              <Col lg={8}>
                <WorkSpace
                  seq={props.seq}
                  readOnly={props.readOnly}
                  workType="rework"
                  workData={sentenceToWorkData(props.seq, review)}
                  onSubmit={(data) => {
                    if (editSentence) {
                      const createSentence: CreateSentence = {
                        taskId: editSentence.edges?.task.id || 0,
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
                    if (editSentence) {
                      const createSentence: CreateSentence = {
                        taskId: editSentence.edges?.task.id || 0,
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

export default ReviewForm;