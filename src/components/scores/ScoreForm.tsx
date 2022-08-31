import React, { useEffect, useLayoutEffect, useState, Fragment } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import ScoreRadio from './ScoreRadio';
import { makeSentenceTagged, arr } from '../../helpers';

export interface ScoreFormProps {
  scoreSentence: string;
  scoreTime: number;
  grammatical: number | null;
  historicity: number | null;
  diversity: number | null;
  fluency: number | null;
  onChange: (data: {
    grammatical: number | null;
    historicity: number | null;
    diversity: number | null;
    fluency: number | null;
  }) => any;
}

const ScoreForm = (props: ScoreFormProps) => {
  const [grammatical, setGrammatical] = useState<number | null>();
  const [historicity, setHistoricity] = useState<number | null>();
  const [diversity, setDiversity] = useState<number | null>();
  const [fluency, setFluency] = useState<number | null>();
  const [scoreSentence, setScoreSentence] = useState<string>();
  const [scoreTime, setScoreTime] = useState<number>(0);
  const [partOfSpeech, setPartOfSpeech] = useState<string>();
  const [radioComponents, setRadioComponents] = useState<JSX.Element>();
  const [radioList, setRadioList] = useState<any[]>();

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

  useEffect(() => {
    props.onChange({
      grammatical: grammatical || null,
      fluency: fluency || null,
      historicity: historicity || null,
      diversity: diversity || null,
    });

    setRadioList(makeRadioList());
    const element = randomRadioComponent();
    setRadioComponents(element);
  }, [grammatical, fluency, historicity, diversity]);

  useEffect(() => {
    if (scoreSentence) {
      const s = makeSentenceTagged(scoreSentence)
        .then((rs) => setPartOfSpeech(rs || ''))
        .catch((reason) => {
          console.error(reason);
        });
    }
  }, [scoreSentence]);

  useEffect(() => {
    const element = randomRadioComponent();
    setRadioComponents(element);
  }, [radioList]);

  useEffect(() => {
    setRadioList(arr.shuffle(makeRadioList()));
    const element = randomRadioComponent();
    setRadioComponents(element);
  }, []);

  useEffect(() => {
    if (scoreTime == 0) {
      setRadioList(arr.shuffle(makeRadioList()));
      const element = randomRadioComponent();
      setRadioComponents(element);
    }
  }, [scoreTime]);

  const makeRadioList = () => {
    if (radioList) {
      return radioList.map((v) => {
        switch (v.varName) {
          case 'grammatical':
            v.getter = grammatical;
            break;
          case 'historicity':
            v.getter = historicity;
            break;
          case 'diversity':
            v.getter = diversity;
            break;
          case 'fluency':
            v.getter = fluency;
            break;
        }
        return v;
      });
    } else {
      return [
        {
          ko: '문법성',
          varName: 'grammatical',
          getter: grammatical,
          setter: setGrammatical,
          onChange: (value: string | number) => {
            console.log('문법성: ' + value.toString());
            setGrammatical(value as number);
          },
        },
        {
          ko: '사실성',
          varName: 'historicity',
          getter: historicity,
          setter: setHistoricity,
          onChange: (value: string | number) => {
            console.log('사실성: ' + value.toString());
            setHistoricity(value as number);
          },
        },
        {
          ko: '다양성',
          varName: 'diversity',
          getter: diversity,
          setter: setDiversity,
          onChange: (value: string | number) => {
            console.log('다양성: ' + value.toString());
            setDiversity(value as number);
          },
        },
        {
          ko: '유창성',
          varName: 'fluency',
          getter: fluency,
          onChange: (value: string | number) => {
            console.log('유창성: ' + value.toString());
            setFluency(value as number);
          },
        },
      ];
    }
  };

  const randomRadioComponent = () => {
    const randomRadioList = radioList || [];
    const radioRows = randomRadioList.map((radio, key) => {
      return (
        <Row key={key}>
          <Col lg={3}>
            <strong>{radio.ko}</strong>
          </Col>
          <ScoreRadio
            id={radio.varName}
            name={radio.varName}
            count={3}
            selectedValue={radio.getter}
            onChange={radio.onChange}
          />
          <hr />
        </Row>
      );
    });
    return (
      <Fragment>
        <Row>
          <Col lg={12}>{radioRows}</Col>
        </Row>
      </Fragment>
    );
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>문장 평가하기</h3>
          <hr />
          <p>원형 데이터와 생성 데이터를 비교해 평가 문장을 평가해주세요.</p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Table
          variant="dark"
          responsive="sm"
          className={'align-content-center'}
          bordered
        >
          <tbody>
            <tr>
              <th scope="col">평가문장</th>
              <td className="bg-white">
                <div
                  style={{
                    color: 'black',
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
              <td className="bg-white">
                <div
                  style={{
                    color: 'black',
                  }}
                >
                  {partOfSpeech}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={1}></Col>
            <Col lg={2}>우수(2점)</Col>
            <Col lg={1}></Col>
            <Col lg={2}>보통(1점)</Col>
            <Col lg={1}></Col>
            <Col lg={2}>미흡(0점)</Col>
          </Row>
        </Col>
      </Row>
      {/*<Row>*/}
      {/*  <Col lg={12}>*/}
      {/*    <Row>*/}
      {/*      <Col lg={3}>*/}
      {/*        <strong>문법성</strong>*/}
      {/*      </Col>*/}
      {/*      <ScoreRadio*/}
      {/*        id={'grammatical'}*/}
      {/*        name={'grammatical'}*/}
      {/*        count={3}*/}
      {/*        selectedValue={grammatical}*/}
      {/*        onChange={(value) => {*/}
      {/*          console.log('문법성: ' + value.toString());*/}
      {/*          setGrammatical(value as number);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <hr />*/}
      {/*    </Row>*/}
      {/*    <Row>*/}
      {/*      <Col lg={3}>*/}
      {/*        <strong>사실성</strong>*/}
      {/*      </Col>*/}
      {/*      <ScoreRadio*/}
      {/*        id={'historicity'}*/}
      {/*        name={'historicity'}*/}
      {/*        count={3}*/}
      {/*        selectedValue={historicity}*/}
      {/*        onChange={(value) => {*/}
      {/*          console.log('사실성: ' + value.toString());*/}
      {/*          setHistoricity(value as number);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <hr />*/}
      {/*    </Row>*/}
      {/*    <Row>*/}
      {/*      <Col lg={3}>*/}
      {/*        <strong>다양성</strong>*/}
      {/*      </Col>*/}
      {/*      <ScoreRadio*/}
      {/*        id={'diversity'}*/}
      {/*        name={'diversity'}*/}
      {/*        count={3}*/}
      {/*        selectedValue={diversity}*/}
      {/*        onChange={(value) => {*/}
      {/*          console.log('다양성: ' + value.toString());*/}
      {/*          setDiversity(value as number);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <hr />*/}
      {/*    </Row>*/}
      {/*    <Row>*/}
      {/*      <Col lg={3}>*/}
      {/*        <strong>유창성</strong>*/}
      {/*      </Col>*/}
      {/*      <ScoreRadio*/}
      {/*        id={'fluency'}*/}
      {/*        name={'fluency'}*/}
      {/*        count={3}*/}
      {/*        selectedValue={fluency}*/}
      {/*        onChange={(value) => {*/}
      {/*          console.log('유창성: ' + value.toString());*/}
      {/*          setFluency(value as number);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <hr />*/}
      {/*    </Row>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {radioComponents}
    </div>
  );
};

export default ScoreForm;
