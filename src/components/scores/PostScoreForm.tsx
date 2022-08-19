import React, { Fragment, useEffect, useState } from 'react';
import { PostScore } from '../../utils/nia153/interfaces/score';
import { useDispatch, useSelector } from 'react-redux';
import scoreModule from '../../store/features/Scores';
import { Row, Modal, Container, Button, Col } from 'react-bootstrap';
import { lang } from '../../helpers';
import Timer from '../common/Timer';
import BaseData from '../common/nia153/BaseData';
import ScoreForm from './ScoreForm';

export interface PostScoreFormProps {
  onSubmit: (data: PostScore) => any;
  onHold: (data: PostScore) => any;
}

export enum PostScoreStatus {
  SCORE = 'SCORE',
  HOLD = 'HOLD',
}

const PostScoreForm = (props: PostScoreFormProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [masterId, setMasterId] = useState<number>();
  const [setsId, setSetsId] = useState<number>();
  const [sentenceId, setSentenceId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [scoreTime, setScoreTIme] = useState<number>(0);
  const [grammatical, setGrammatical] = useState<number | null>(null);
  const [historicity, setHistoricity] = useState<number | null>(null);
  const [diversity, setDiversity] = useState<number | null>(null);
  const [fluency, setFluency] = useState<number | null>(null);
  const [status, setStatus] = useState<PostScoreStatus>();
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);

  const { selectAssign, time } = useSelector(scoreModule.getScoreState);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setInterval(() => {
      setScoreTIme(scoreTime + 1);
    }, 1000);

    setTimer(timerId);
  }, []);

  useEffect(() => {
    if (selectAssign.data) {
      setMasterId(selectAssign.data.masterId);
      setSetsId(selectAssign.data.setsId);
      setSentenceId(selectAssign.data.sentenceId);
      setUserId(selectAssign.data.user.id);
      setStatus(PostScoreStatus.SCORE);
      setTotalCount(selectAssign.leftCount);
      setCreatedCount(selectAssign.createdCount);
    }
  }, [selectAssign.data]);

  return (
    <Fragment>
      <Modal
        centered
        dialogClassName={'modal-80w'}
        show={show}
        onHide={() => {
          setShow(false);
          dispatch(
            scoreModule.actions.setAssign({
              leftCount: 0,
              createdCount: 0,
              data: null,
            }),
          );
          dispatch(
            scoreModule.actions.setScore({
              leftCount: 0,
              createdCount: 0,
              data: null,
            }),
          );
        }}
      >
        <Modal.Header closeButton>
          <Container className="mt-2">
            <Row>
              <Col lg={4} className="mt-2">
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
                <Timer time={time || '00:00:00'} />

                <Button
                  variant="light"
                  className="bg-light border h-100"
                  style={{ cursor: 'default' }}
                >
                  평가 가능 개념집합
                  <br />
                  {totalCount}건
                </Button>
                <Button
                  variant="light"
                  className="bg-light border h-100"
                  style={{ cursor: 'default' }}
                >
                  평가 완료 개념집합
                  <br />
                  {createdCount}건
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container className="mt-2">
            <Row>
              <Col lg={4}>
                <BaseData
                  basicSentence={selectAssign.data?.basicSentence || ''}
                  basicSentenceCount={
                    selectAssign.data?.basicSentenceCount || 0
                  }
                  concepts={selectAssign.data?.concept || []}
                  primaryCode={selectAssign.data?.sentenceId || 0}
                />
              </Col>
              <Col lg={8}>
                <ScoreForm
                  diversity={diversity}
                  fluency={fluency}
                  grammatical={grammatical}
                  historicity={historicity}
                  scoreSentence={selectAssign.data?.scoreSentence || ''}
                  scoreTime={scoreTime}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default PostScoreForm;
