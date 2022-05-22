import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Card from './Card';
import { baikalNlp, lang, str } from '../../helpers';
import ReviewSection, { ReviewResultState } from '../reviews/ReviewSection';

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
  workType?: 'work' | 'review';
  workData?: WorkData;
  onSubmit: (data: WorkData) => any;
  onChange: (data: WorkData) => any;
}

const WorkSpace = (props: WorkSpaceProps) => {
  const [textArea10, setText10] = useState('');
  const [textArea20, setText20] = useState('');
  const [textArea11, setText11] = useState('');
  const [textArea21, setText21] = useState('');
  const [patternedText, setPatText] = useState<string[]>(['temp', 'temp2']);
  const [wordCount1, setCount1] = useState(0);
  const [wordCount2, setCount2] = useState(0);
  const [reviewData1, setReview1] = useState<ReviewResultState | undefined>();
  const [reviewData2, setReview2] = useState<ReviewResultState | undefined>();
  const [reviewPassBtn, setReviewPassBtn] = useState<boolean>(false);
  const [reviewOpinionBtn, setReviewOpinionBtn] = useState<boolean>(false);
  const [reviewHoldBtn, setReviewHoldBtn] = useState<boolean>(true);

  const handleChange = (id: number, v: string) => {
    switch (id) {
      case 10:
        if (str.filterKorean(v)) {
          setText10(v);
        }
        break;
      case 11:
        setText11(v);
        break;
      case 20:
        if (str.filterKorean(v)) {
          setText20(v);
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
    if (no === 0) {
      setText11(patternedText[no]);
    } else if (no === 1) {
      setText21(patternedText[no]);
    }
  };

  const checkBtnActivate = () => {
    if (
      reviewData1?.radio == ReviewResult.PASS &&
      reviewData2?.radio == ReviewResult.PASS
    ) {
      setReviewPassBtn(true);
    }

    if (
      reviewData1?.radio != ReviewResult.PASS ||
      reviewData2?.radio != ReviewResult.PASS
    ) {
      setReviewOpinionBtn(true);
    }
  };

  useEffect(() => {
    setCount1(props.workData?.wordCount1 || 0);
    setCount2(props.workData?.wordCount2 || 0);
    setText10(props.workData?.textArea10 || '');
    setText11(props.workData?.textArea11 || '');
    setText20(props.workData?.textArea20 || '');
    setText21(props.workData?.textArea21 || '');
    setPatText(props.workData?.origin || ['temp', 'temp2']);
  }, []);

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
        console.log(reason);
        setCnt(0);
      });
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
          <Row>
            <FloatingLabel label="문장1" controlId="floatingTextarea">
              <Form.Control
                as="textarea"
                placeholder="문장1"
                value={textArea10}
                onChange={(e) => {
                  handleChange(10, e.target.value);
                }}
                onBlur={(e) => {
                  handleWordCount(1, e.target.value);
                }}
              />
            </FloatingLabel>
          </Row>
          <Row>
            <span className="text-end">단어 수: {wordCount1}</span>
          </Row>
        </Col>
        <Col lg={2} className="mt-2">
          <Button
            variant={textArea10 ? 'primary' : 'light'}
            style={{ fontSize: '0.85em' }}
            disabled={!textArea10}
            onClick={() => {
              console.log('get api');
              handleMakeSPClick(0);
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

      {props.workType == 'review' ? (
        <Row id="review1" className="mt-2">
          <ReviewSection
            seq={1}
            data={reviewData2}
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
            <FloatingLabel label="문장2" controlId="floatingTextarea">
              <Form.Control
                as="textarea"
                placeholder="문장2"
                value={textArea20}
                onChange={(e) => {
                  handleChange(20, e.target.value);
                }}
                onBlur={(e) => {
                  handleWordCount(2, e.target.value);
                }}
              />
            </FloatingLabel>
          </Row>
          <Row>
            <span className="text-end">단어 수: {wordCount2}</span>
          </Row>
        </Col>
        <Col lg={2} className="mt-2">
          <Button
            variant={textArea20 ? 'primary' : 'light'}
            style={{ fontSize: '0.85em' }}
            disabled={!textArea20}
            onClick={() => {
              console.log('get api');
              handleMakeSPClick(1);
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
      {props.workType == 'review' ? (
        <Row id="review2" className="mt-2">
          <ReviewSection
            seq={2}
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
      {props.workType == 'review' ? (
        <Row className="mt-xxl-5 mx-0">
          <Col>
            <Button
              variant={reviewHoldBtn ? 'warning' : 'secondary'}
              className="w-100"
              disabled={!reviewHoldBtn}
              onClick={() => {
                if (reviewHoldBtn) {
                  setReview1({
                    radio: ReviewResult.HOLD,
                    check: reviewData1?.check || [],
                    memo: reviewData1?.memo || '',
                  });
                  setReview2({
                    radio: ReviewResult.HOLD,
                    check: reviewData2?.check || [],
                    memo: reviewData2?.memo || '',
                  });
                  props.onSubmit(toWorkData());
                }
              }}
            >
              보류
            </Button>
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
      ) : (
        <Row className="mt-xxl-5 mx-0">
          <Button
            variant={
              textArea10 && textArea20 && textArea11 && textArea21
                ? 'warning'
                : 'secondary'
            }
            disabled={!(textArea10 && textArea20 && textArea11 && textArea21)}
            onClick={() => props.onSubmit(toWorkData())}
          >
            검수 요청
          </Button>
        </Row>
      )}
    </Fragment>
  );
};

export default WorkSpace;
