import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from './Card';
import {
  baikalNlp,
  config,
  lang,
  str,
  makeSentencePattern,
  checkDualFrame,
  checkTripleFrame,
} from '../../helpers';
import ReviewSection, { ReviewResultState } from '../reviews/ReviewSection';
import { useDispatch } from 'react-redux';
import alertModal from '../../store/features/common/alertModal';
import { usePrev } from '../../helpers';
import { Concept, Task } from '../../utils/nia15/interfaces/tasks';
import {
  DualFrameText,
  FrameText,
  TripleFrameText,
} from '../../utils/tmkor/TmKor';

export enum ReviewResult {
  PASS = 'PASS',
  FAIL = 'FAIL',
  HOLD = 'HOLD',
}

export interface WorkData {
  textArea10: string;
  textArea11: string;
  textArea20: string;
  textArea21: string;
  wordCount1: number;
  wordCount2: number;
  origin: string[];
  reviewData?: ReviewData;
}

export interface ReviewData {
  result1: ReviewResult;
  result2: ReviewResult;
  rejectReason1?: number[];
  rejectReason2?: number[];
  memo1?: string;
  memo2?: string;
}

export interface WorkSpaceProps {
  seq?: number;
  task: Task;
  workType: 'work' | 'rework' | 'review';
  workData?: WorkData;
  readOnly?: boolean;
  onSubmit: (data: WorkData) => any;
  onChange: (data: WorkData) => any;
}

const WorkSpace = (props: WorkSpaceProps) => {
  const dispatch = useDispatch();
  const [originSP, setOriginSP] = useState('');
  const [textArea10, setText10] = useState('');
  const [textArea20, setText20] = useState('');
  const [textArea11, setText11] = useState('');
  const [textArea21, setText21] = useState('');
  const [patternedText, setPatText] = useState<string[]>(['', '']);
  const [wordCount1, setCount1] = useState(0);
  const [wordCount2, setCount2] = useState(0);
  const [clickedMkSp, setClickedMkSp] = useState<boolean[]>([false, false]);
  const [requestBtn, setRequestBtn] = useState<boolean>(false);
  const [reviewData1, setReview1] = useState<ReviewResultState | undefined>();
  const [reviewData2, setReview2] = useState<ReviewResultState | undefined>();
  const [reviewPassBtn, setReviewPassBtn] = useState<boolean>(false);
  const [reviewOpinionBtn, setReviewOpinionBtn] = useState<boolean>(false);
  const [reviewHoldBtn, setReviewHoldBtn] = useState<boolean>(true);
  const [s1Danger, setDanger1] = useState<string>('');
  const [s2Danger, setDanger2] = useState<string>('');

  const prevPatText = usePrev<string[]>(patternedText);
  const prevTextArea10 = usePrev<string>(textArea10);
  const prevTextArea20 = usePrev<string>(textArea20);

  useEffect(() => {
    setCount1(props.workData?.wordCount1 || 0);
    setCount2(props.workData?.wordCount2 || 0);
    setText10(props.workData?.textArea10 || '');
    setText11(props.workData?.textArea11 || '');
    setText20(props.workData?.textArea20 || '');
    setText21(props.workData?.textArea21 || '');
    setPatText(props.workData?.origin || ['', '']);

    setReview1({
      radio: props.workData?.reviewData?.result1 as ReviewResult,
      check: props.workData?.reviewData?.rejectReason1 as number[],
      memo: props.workData?.reviewData?.memo1 || '',
    });

    setReview2({
      radio: props.workData?.reviewData?.result2 as ReviewResult,
      check: props.workData?.reviewData?.rejectReason2 as number[],
      memo: props.workData?.reviewData?.memo2 || '',
    });

    if (props.workType == 'rework' || props.workType == 'review') {
      setClickedMkSp([true, true]);
    }

    if (props.task.sentence) {
      makeSP(props.task.sentence).then((res) => {
        if (res) {
          setOriginSP(res);
        }
      });
    }
  }, []);

  useEffect(() => {
    const patText = patternedText;
    if (prevPatText && patternedText[0] == prevPatText[0]) {
      patText[0] = textArea10;
      if (
        textArea10 != props?.workData?.textArea10 &&
        textArea10 != prevTextArea10
      ) {
        setIsClickedMkSp(0, false);
      }
    }

    if (prevPatText && patternedText[1] == prevPatText[1]) {
      patText[1] = textArea20;
      if (
        textArea20 != props?.workData?.textArea20 &&
        textArea20 != prevTextArea20
      ) {
        setIsClickedMkSp(1, false);
      }
    }

    setPatText(patText);
    setRequestBtn(false);
    setReviewPassBtn(false);
    setReviewOpinionBtn(false);

    console.log('change text');
  }, [textArea10, textArea20]);

  useEffect(() => {
    console.log('prevPatText', prevPatText);
    if (prevPatText && patternedText[0] != prevPatText[0]) {
      setText11(patternedText[0] || textArea10);
      checkBtnActivate();
    }

    if (prevPatText && patternedText[1] != prevPatText[0]) {
      setText21(patternedText[1] || textArea20);
      checkBtnActivate();
    }
  }, [patternedText]);

  const setIsClickedMkSp = (offset: number, value: boolean) => {
    const prevMkSp = clickedMkSp;
    prevMkSp[offset] = value;
    setClickedMkSp(prevMkSp);
  };

  /**
   * return 0 = pass,
   * return 1 = not korean,
   * return 2 = end dot
   * @param {string} v
   * @return {number}
   */
  const catchSentenceValid = (v: string): number => {
    if (str.filterKorean(v)) {
      if (v[v.length - 2] == '.') {
        return 2;
      }
      return 0;
    } else {
      return 1;
    }
  };

  const showAlert = (valid: number) => {
    if (valid == 1) {
      dispatch(
        alertModal.showAlert({
          title: '잘못된 입력',
          message: '인용 부호를 제외한 영문과 특수문자는 입력할 수 없습니다.',
        }),
      );
    } else if (valid == 2) {
      dispatch(
        alertModal.showAlert({
          title: '잘못된 입력',
          message: '마침표는 문장 마지막에만 사용 가능합니다.',
        }),
      );
    }
  };

  const handleChange = (id: number, v: string) => {
    switch (id) {
      case 10:
        setDanger1('');
        const valid1 = catchSentenceValid(v);
        if (!valid1) {
          setText10(v);
        } else {
          showAlert(valid1);
        }
        break;
      case 11:
        setText11(v);
        break;
      case 20:
        setDanger2('');
        const valid2 = catchSentenceValid(v);
        if (!valid2) {
          setText20(v);
        } else {
          showAlert(valid2);
        }

        break;
      case 21:
        setText21(v);
        break;
      default:
        break;
    }
  };

  const handleReviewChange = (seq: number, state: ReviewResultState) => {
    if (seq == 1) {
      setReview1(state);
    }

    if (seq == 2) {
      setReview2(state);
    }
  };

  const handleMakeSPClick = (no: number) => {
    const newPatternedText = patternedText;

    if (no === 0) {
      newPatternedText[no] = patternedText[no] || textArea10;
      setPatText(newPatternedText);
      setText11(patternedText[no] || textArea10);
      console.log('makeSPC1');
      setIsClickedMkSp(no, true);
    } else if (no === 1) {
      newPatternedText[no] = patternedText[no] || textArea10;
      setPatText(newPatternedText);
      setText21(patternedText[no] || textArea20);
      console.log('makeSPC2');
      setIsClickedMkSp(no, true);
    }
  };

  const isClickedMkSp = () => {
    return clickedMkSp[0] && clickedMkSp[1];
  };

  const checkBtnActivate = () => {
    console.log('checkBtnActivate');
    if (textArea10 && textArea20 && textArea11 && textArea21) {
      if (isClickedMkSp()) {
        setRequestBtn(true);
      } else {
        setRequestBtn(false);
      }
    } else {
      setRequestBtn(false);
    }

    if (
      reviewData1?.radio == ReviewResult.PASS &&
      reviewData2?.radio == ReviewResult.PASS
    ) {
      if (isClickedMkSp()) {
        setReviewPassBtn(true);
      } else {
        setReviewPassBtn(false);
      }
    } else {
      setReviewPassBtn(false);
    }

    const validReject1 = validReject(reviewData1);
    const validReject2 = validReject(reviewData2);

    setReviewOpinionBtn(validReject1 || validReject2);
  };

  const validReject = (reviewResult: ReviewResultState | undefined) => {
    const rejectReasons: number[] = config.selectOptions.RejectReason.map(
      (value) => parseInt(value.value.toString()),
    );
    if (!reviewResult) {
      return false;
    }

    console.log('validReject', reviewResult);

    if (reviewResult.radio == ReviewResult.FAIL) {
      if (reviewResult.check && reviewResult.check.length != 0) {
        if (
          reviewResult.check.includes(rejectReasons[rejectReasons.length - 1])
        ) {
          return !!reviewResult.memo;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }

    return false;
  };

  const toWorkData = (): WorkData => {
    let reviewData: ReviewData | undefined = undefined;
    if (props.workType == 'review') {
      console.log('ch radio', reviewData1?.radio);
      console.log('ch radio', reviewData2?.radio);
      reviewData = {
        result1: reviewData1?.radio as ReviewResult,
        result2: reviewData2?.radio as ReviewResult,
        rejectReason1: reviewData1?.check as number[],
        rejectReason2: reviewData2?.check as number[],
        memo1: reviewData1?.memo,
        memo2: reviewData2?.memo,
      };
    }

    return {
      textArea10: textArea10,
      textArea11: textArea11,
      textArea20: textArea20,
      textArea21: textArea21,
      wordCount1: wordCount1,
      wordCount2: wordCount2,
      origin: patternedText,
      reviewData: reviewData,
    };
  };

  const toHoldData = (): WorkData => {
    let reviewData: ReviewData | undefined = undefined;
    if (props.workType == 'review') {
      reviewData = {
        result1: ReviewResult.HOLD,
        result2: ReviewResult.HOLD,
      };
    }

    return {
      textArea10: props.workData?.textArea10 || '',
      textArea11: props.workData?.textArea11 || '',
      textArea20: props.workData?.textArea20 || '',
      textArea21: props.workData?.textArea21 || '',
      wordCount1: props.workData?.wordCount1 || 0,
      wordCount2: props.workData?.wordCount2 || 0,
      origin: props.workData?.origin || ['', ''],
      reviewData: reviewData,
    };
  };

  useEffect(() => {
    checkBtnActivate();
    const data = toWorkData();
    props.onChange(data);
  }, [
    textArea10,
    textArea20,
    textArea11,
    textArea21,
    patternedText,
    wordCount1,
    wordCount2,
    reviewData1,
    reviewData2,
  ]);

  const countWord = async (str: string): Promise<number> => {
    return await baikalNlp.getPosLength(str);
  };

  const handleWordCount = (cntNo: number, str: string) => {
    let setCnt: React.Dispatch<React.SetStateAction<number>>;
    if (cntNo == 1) {
      setCnt = setCount1;
    } else if (cntNo == 2) {
      setCnt = setCount2;
    } else {
      return;
    }

    countWord(str)
      .then((count) => {
        setCnt(count);
      })
      .catch((reason) => {
        console.error('word counting fail:', reason);
        setCnt(0);
      });
  };

  const makeSP = async (str: string) => {
    return await makeSentencePattern(str);
  };

  // const checkConcepts = async (concepts: Concept[], str: string) => {
  //   return await baikalNlp.checkConcepts(concepts, str);
  // };

  const checkDup = async (sentences: { text1: string; text2: string }) => {
    return await checkDualFrame(sentences);
    // if (checked) {
    //   if (checked.duplicated) {
    //     return checked;
    //   } else {
    //     checked.duplicated =
    //       checked.frame1.frameText != checked.frame2.frameText;
    //
    //     return checked;
    //   }
    // }
  };

  const checkTriple = async (sentences: {
    defaultText: string;
    text1: string;
    text2: string;
  }) => {
    return await checkTripleFrame(sentences);
  };

  const showAlertForMakeSP = (cntNo: number, message: any) => {
    dispatch(
      alertModal.showAlert({
        title: '문형 만들기',
        message: message,
      }),
    );
  };

  const handleMakeSP = async (
    cntNo: number,
    str: string,
  ): Promise<{ status: boolean; message: string }> => {
    const basicSentence = props.task.sentence;
    let setSentencePattern: React.Dispatch<React.SetStateAction<string>>;
    let otherSentence: string;
    let frame: FrameText | DualFrameText | TripleFrameText | null;
    if (cntNo == 1) {
      setSentencePattern = setText11;
      otherSentence = textArea20;
      setIsClickedMkSp(cntNo - 1, false);
      setSentencePattern('');
    } else if (cntNo == 2) {
      setSentencePattern = setText21;
      otherSentence = textArea10;
      setIsClickedMkSp(cntNo - 1, false);
      setSentencePattern('');
    } else {
      return {
        status: false,
        message: '잘못된 파라미터 입니다.',
      };
    }

    try {
      if (otherSentence) {
        frame = await checkTriple({
          defaultText: basicSentence,
          text1: str,
          text2: otherSentence,
        });
      } else {
        frame = await checkDup({
          text1: str,
          text2: basicSentence,
        });
      }

      if (frame) {
        if (frame.duplicated) {
          showAlertForMakeSP(cntNo, '기본 문장/다른 문장과 동일한 문형입니다.');
          return {
            status: false,
            message: '기본 문장/다른 문장과 동일한 문형입니다.',
          };
        } else {
          const madeSP = frame.frame1.frameText;
          if (madeSP) {
            setIsClickedMkSp(cntNo - 1, true);
            setSentencePattern(madeSP);
            return {
              status: true,
              message: '',
            };
          }
        }
      } else {
        const madeSP = await makeSP(str);
        if (madeSP) {
          setSentencePattern(madeSP);
          return {
            status: true,
            message: '',
          };
        }
      }
    } catch (e) {
      setIsClickedMkSp(cntNo - 1, false);
      setSentencePattern('');
      showAlertForMakeSP(cntNo, e);
      return {
        status: false,
        message: e as string,
      };
    }

    return {
      status: false,
      message: '',
    };
  };

  return (
    <Fragment>
      <Card
        header={
          props.workType == 'review'
            ? lang.sentence.workSpace.review.subject
            : lang.sentence.workSpace.work.subject
        }
      >
        <p style={{ whiteSpace: 'pre' }}>
          {props.workType == 'review'
            ? lang.sentence.workSpace.review.description
            : lang.sentence.workSpace.work.description}
        </p>
      </Card>
      <Row>
        <Col lg={5}>
          <Row>
            <Form.Group>
              <Row>
                <Col lg={3}>
                  <Form.Label>문장1</Form.Label>
                </Col>
                <Col lg={9} className="text-end text-danger text-break">
                  <span className="text-danger" style={{ fontSize: '0.70rem' }}>
                    {s1Danger}
                  </span>
                </Col>
              </Row>
              <Form.Control
                as="textarea"
                className="h-auto"
                rows={5}
                value={textArea10}
                readOnly={props?.readOnly || false}
                onChange={(e) => {
                  handleChange(10, e.target.value);
                }}
                // onBlur={(e) => {
                //   handleWordCount(1, e.target.value);
                // }}
              />
            </Form.Group>
          </Row>
          <Row>
            <span className="text-end">단어 수: {wordCount1}</span>
          </Row>
        </Col>
        <Col lg={2} className="mt-5 text-center">
          <Button
            variant={textArea10 ? 'primary' : 'light'}
            style={{ fontSize: '0.85em' }}
            className="mt-4"
            disabled={props?.readOnly || false ? true : !textArea10}
            onClick={() => {
              handleMakeSPClick(0);
              handleWordCount(1, textArea10);
              handleMakeSP(1, textArea10).then((result) => console.log(result));
            }}
          >
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <Form.Group>
            <Form.Label>문장1</Form.Label>
            <Form.Control
              as="textarea"
              className="h-25"
              rows={5}
              value={textArea11}
              readOnly={props?.readOnly || false}
              onChange={(e) => {
                handleChange(11, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      {props.workType == 'review' || props.workType == 'rework' ? (
        <Row id="review1" className="mt-2">
          <ReviewSection
            seq={1}
            readOnly={props.workType == 'rework' ? true : props.readOnly}
            data={reviewData1}
            onChange={(state) => handleReviewChange(1, state)}
          />
        </Row>
      ) : (
        <Row id="reset1" className="mt-2">
          <Col lg={5}>
            <Row>
              <Col>
                <Button
                  id="resetBtn1"
                  variant="dark"
                  className="float-end"
                  disabled={props.readOnly || false}
                  onClick={() => {
                    setText10('');
                    setText11('');
                    setCount1(0);
                  }}
                >
                  다시쓰기
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col lg={5}>
          <Row>
            <Form.Group>
              <Row>
                <Col lg={3}>
                  <Form.Label>문장2</Form.Label>
                </Col>
                <Col lg={9} className="text-end text-danger text-break">
                  <span className="text-danger" style={{ fontSize: '0.70rem' }}>
                    {s2Danger}
                  </span>
                </Col>
              </Row>
              <Form.Control
                as="textarea"
                className="h-auto"
                rows={5}
                value={textArea20}
                readOnly={props?.readOnly || false}
                onChange={(e) => {
                  handleChange(20, e.target.value);
                }}
                // onBlur={(e) => {
                //   handleWordCount(2, e.target.value);
                // }}
              />
            </Form.Group>
          </Row>
          <Row>
            <span className="text-end">단어 수: {wordCount2}</span>
          </Row>
        </Col>
        <Col lg={2} className="mt-5 text-center">
          <Button
            className="mt-4"
            variant={textArea20 ? 'primary' : 'light'}
            style={{ fontSize: '0.85em' }}
            disabled={props?.readOnly || false ? true : !textArea20}
            onClick={() => {
              handleMakeSPClick(1);
              handleWordCount(2, textArea20);
              handleMakeSP(2, textArea20).then((result) => console.log(result));
            }}
          >
            문형 만들기
          </Button>
        </Col>
        <Col lg={5}>
          <Form.Group>
            <Form.Label>문장2</Form.Label>
            <Form.Control
              as="textarea"
              value={textArea21}
              className="h-25"
              rows={5}
              readOnly={props?.readOnly || false}
              onChange={(e) => {
                handleChange(21, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      {props.workType == 'review' || props.workType == 'rework' ? (
        <Row id="review2" className="mt-2">
          <ReviewSection
            seq={2}
            readOnly={props.workType == 'rework' ? true : props.readOnly}
            data={reviewData2}
            onChange={(state) => handleReviewChange(2, state)}
          />
        </Row>
      ) : (
        <Row id="reset2" className="mt-2">
          <Col lg={5}>
            <Row>
              <Col>
                <Button
                  id="resetBtn2"
                  variant="dark"
                  className="float-end"
                  disabled={props?.readOnly || false}
                  onClick={() => {
                    setText20('');
                    setText21('');
                    setCount2(0);
                  }}
                >
                  다시쓰기
                </Button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      )}

      {props.workType == 'review' && props.readOnly != true ? (
        <Row className="mt-xxl-5 mx-0">
          <Col>
            {props.seq == 1 ? (
              <Button
                variant={reviewHoldBtn ? 'warning' : 'secondary'}
                className="w-100"
                disabled={!reviewHoldBtn}
                onClick={() => {
                  if (reviewHoldBtn) {
                    props.onSubmit(toHoldData());
                  }
                }}
              >
                보류
              </Button>
            ) : null}
          </Col>
          <Col>
            <Button
              className="w-100"
              variant={reviewOpinionBtn ? 'warning' : 'secondary'}
              disabled={!reviewOpinionBtn}
              onClick={() => {
                if (reviewOpinionBtn) {
                  props.onSubmit(toWorkData());
                }
              }}
            >
              검토의견 제출
            </Button>
          </Col>
          <Col>
            <Button
              className="w-100"
              variant={reviewPassBtn ? 'warning' : 'secondary'}
              disabled={!reviewPassBtn}
              onClick={() => {
                if (reviewPassBtn) {
                  props.onSubmit(toWorkData());
                }
              }}
            >
              수정 후 일괄 승인
            </Button>
          </Col>
        </Row>
      ) : props.readOnly != true ? (
        <Row className="mt-xxl-5 mx-0">
          <Button
            variant={requestBtn ? 'warning' : 'secondary'}
            disabled={!requestBtn}
            onClick={() => props.onSubmit(toWorkData())}
          >
            검수 요청
          </Button>
        </Row>
      ) : null}
    </Fragment>
  );
};
export default WorkSpace;
