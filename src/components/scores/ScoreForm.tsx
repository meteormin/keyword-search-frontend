import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';

export interface ScoreFormProps {
  scoreSentence: string;
  scoreTime: number;
  grammatical: number | null;
  historicity: number | null;
  diversity: number | null;
  fluency: number | null;
}

const ScoreForm = (props: ScoreFormProps) => {
  const [grammatical, setGrammatical] = useState<number | null>();
  const [historicity, setHistoricity] = useState<number | null>();
  const [diversity, setDiversity] = useState<number | null>();
  const [fluency, setFluency] = useState<number | null>();
  const [scoreSentence, setScoreSentence] = useState<string>();
  const [scoreTime, setScoreTime] = useState<number>(0);
  const [partOfSpeech, setPartOfSpeech] = useState<string>();

  useLayoutEffect(() => {
    setScoreTime(props.scoreTime);
  }, [props.scoreTime]);

  useEffect(() => {
    setGrammatical(props.grammatical);
    setFluency(props.fluency);
    setDiversity(props.diversity);
    setHistoricity(props.historicity);
    setScoreSentence(props.scoreSentence);
  }, [
    props.grammatical,
    props.fluency,
    props.diversity,
    props.scoreSentence,
    props.historicity,
  ]);

  return (
    <div>
      <Row>
        <Col>
          <h2>문장 평가하기</h2>
          <hr />
          <p>원형 데이터와 생성 데이터를 비교해 평가 문장을 평가해주세요.</p>
        </Col>
      </Row>
      <Row>
        <Table
          variant="dark"
          responsive="sm"
          hover
          className={'align-content-center'}
          bordered
        >
          <tbody>
            <tr>
              <th scope="col">평가문장</th>
              <td className="bg-white">
                <div
                  style={{
                    overflow: 'auto',
                    maxWidth: '250px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {scoreSentence}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                생성 데이터 품사
              </th>
              <td className="bg-white">{partOfSpeech}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default ScoreForm;
