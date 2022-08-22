import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Concept } from '../../../utils/nia153/interfaces/sentence';
import { makeSentenceTagged } from '../../../helpers';

export interface BaseDataProps {
  primaryCode: string | number;
  concepts: Concept[];
  basicSentence: string;
  basicSentenceCount: number;
}

const BaseData = (props: BaseDataProps) => {
  const [primaryCode, setPrimaryCode] = useState<string | number>();
  const [concepts, setConcepts] = useState<string>();
  const [taggedConcepts, setTaggedConcepts] = useState<string>();
  const [basicSentence, setBasicSentence] = useState<string>();
  const [basicSentenceCount, setBasicSentenceCount] = useState<number>();
  const [partOfSpeech, setPartOfSpeech] = useState<string>();

  const conceptToString = (concept: Concept): string => {
    return `${concept.stem}(${concept.postag})`;
  };

  useEffect(() => {
    setPrimaryCode(props.primaryCode);
    setConcepts(props.concepts.map((v) => v.stem).join(', '));
    setTaggedConcepts(props.concepts.map(conceptToString).join(', '));
    setBasicSentence(props.basicSentence);
    setBasicSentenceCount(props.basicSentenceCount);
  }, []);

  useEffect(() => {
    if (basicSentence) {
      const s = makeSentenceTagged(basicSentence)
        .then((rs) => setPartOfSpeech(rs || ''))
        .catch((reason) => {
          console.error(reason);
        });
    }
  }, [basicSentence]);

  return (
    <div>
      <Row>
        <Col>
          <h3>기본 데이터</h3>
          <hr />
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <Table
          variant="light"
          responsive="sm"
          className={'align-content-center'}
          bordered
        >
          <tbody>
            <tr>
              <th scope="col">고유코드</th>
              <td className="bg-white">
                <div
                  style={{
                    overflow: 'auto',
                    maxWidth: '250px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {primaryCode}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                개념집합
              </th>
              <td className="bg-white">{concepts}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                개념집합태그
              </th>
              <td className="bg-white">{taggedConcepts}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                단어개수
              </th>
              <td className="bg-white">{basicSentenceCount}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                기본문장
              </th>
              <td className="bg-white">{basicSentence}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                품사
              </th>
              <td className="bg-white">{partOfSpeech}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default BaseData;
