import React, { Fragment, useEffect, useRef, useState } from 'react';
import { PostScore } from '../../utils/nia153/interfaces/score';
import { useDispatch, useSelector } from 'react-redux';
import scoreModule from '../../store/features/scores';
import { Row, Modal, Container, Button, Col } from 'react-bootstrap';
import { lang } from '../../helpers';
import Timer from '../common/Timer';
import BaseData from '../common/nia153/BaseData';
import ScoreForm from './ScoreForm';
import alertModal from '../../store/features/common/alertModal';

export interface PostScoreFormProps {
  show: boolean;
  onSubmit: () => any;
  onHold: () => any;
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
  const scoreTime = useRef<number>(0);
  const [timerId, setTimerId] = useState<any | null>(null);
  const [grammatical, setGrammatical] = useState<number | null>(null);
  const [historicity, setHistoricity] = useState<number | null>(null);
  const [diversity, setDiversity] = useState<number | null>(null);
  const [fluency, setFluency] = useState<number | null>(null);
  const [status, setStatus] = useState<PostScoreStatus>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { selectAssign, time } = useSelector(scoreModule.getScoreState);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(props.show);
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
      setShow(true);
    } else {
      resetData();
    }
  }, [selectAssign.data]);

  useEffect(() => {
    if (
      diversity &&
      fluency &&
      historicity &&
      grammatical &&
      scoreTime.current > 5
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [diversity, fluency, historicity, grammatical, scoreTime.current]);

  useEffect(() => {
    if (show) {
      const timer = setInterval(() => {
        console.log('scoretime', scoreTime.current);
        scoreTime.current += 1;
      }, 1000);

      setTimerId(timer);
      return () => clearInterval(timer);
    } else {
      if (timerId) {
        clearInterval(timerId);
      }
    }
  }, [show]);

  const onHold = () => {
    if (masterId && setsId && sentenceId) {
      const data: PostScore = {
        diversity: 0,
        fluency: 0,
        grammatical: 0,
        historicity: 0,
        scoreTime: scoreTime.current,
        status: PostScoreStatus.HOLD,
        masterId: masterId,
        setsId: setsId,
        sentenceId: sentenceId,
      };
      dispatch(scoreModule.actions.createScore(data));
    } else {
      dispatch(
        alertModal.showAlert({
          title: '유효성 검사 실패',
          message: '존재하지 않는 문장 데이터입니다.',
        }),
      );
    }
    props.onHold();
  };

  const resetData = () => {
    setShow(false);
    setDiversity(null);
    setGrammatical(null);
    setHistoricity(null);
    setFluency(null);
    scoreTime.current = 0;
  };

  const onSubmit = () => {
    if (scoreTime.current < 5) {
      dispatch(
        alertModal.showAlert({
          title: '진행 시간',
          message: '5초 뒤에 제출 할 수 있습니다.',
        }),
      );
      return;
    }
    if (masterId && setsId && sentenceId) {
      if (diversity && fluency && grammatical && historicity) {
        const data: PostScore = {
          diversity: diversity,
          fluency: fluency,
          grammatical: grammatical,
          historicity: historicity,
          scoreTime: scoreTime.current,
          status: PostScoreStatus.SCORE,
          masterId: masterId,
          setsId: setsId,
          sentenceId: sentenceId,
        };
        dispatch(scoreModule.actions.createScore(data));
      } else {
        dispatch(
          alertModal.showAlert({
            title: '유효성 검사 실패',
            message: '평가 항목을 모두 작성해주세요.',
          }),
        );
      }
    } else {
      dispatch(
        alertModal.showAlert({
          title: '유효성 검사 실패',
          message: '존재하지 않는 문장 데이터입니다.',
        }),
      );
    }
    props.onSubmit();
  };

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
          scoreTime.current = 0;
          if (timerId) {
            clearInterval();
          }

          setTimerId(null);
          setGrammatical(null);
          setFluency(null);
          setCanSubmit(false);
          setHistoricity(null);
          setDiversity(null);
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
                      'toolbar=yes, menubar=yes, scrollbar=yes, resizeable=yes, width=445, height=655, left=0, top=0',
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
                <Button
                  variant="light"
                  className="bg-light border h-100"
                  style={{ cursor: 'default' }}
                >
                  진행시간
                  <br />
                  {scoreTime.current}초
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container className="mt-2">
            <Row className="mt-2">
              <Col lg={4}>
                <BaseData
                  basicSentence={selectAssign.data?.basicSentence || ''}
                  basicSentenceCount={
                    selectAssign.data?.basicSentenceCount || 0
                  }
                  concepts={selectAssign.data?.concepts || []}
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
                  scoreTime={scoreTime.current}
                  onChange={(data) => {
                    setDiversity(data.diversity);
                    setHistoricity(data.historicity);
                    setFluency(data.fluency);
                    setGrammatical(data.grammatical);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Button
                  type="button"
                  variant="warning"
                  className="w-100"
                  onClick={onHold}
                >
                  보류
                </Button>
              </Col>
              <Col lg={8}>
                <Button
                  type="button"
                  variant={canSubmit ? 'warning' : 'secondary'}
                  className="w-100"
                  onClick={onSubmit}
                  disabled={!canSubmit}
                >
                  제출
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default PostScoreForm;
