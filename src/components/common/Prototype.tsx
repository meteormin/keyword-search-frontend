import React, { useEffect, useState } from 'react';
import Card from './Card';
import { lang, makeSentencePattern } from '../../helpers';
import { Row, Table } from 'react-bootstrap';

export interface PrototypeProps {
  primaryCode: string;
  concepts: string[];
  conceptsTag: string[];
  wordCount: number;
  basicSentence: string;
  prototypeSentence: string;
}

const Prototype = (props: PrototypeProps) => {
  const [primaryCode, setPrimaryCode] = useState<string>('');
  const [concepts, setConcepts] = useState<string[]>([]);
  const [conceptsTag, setConceptsTag] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [basicSentence, setBasic] = useState<string>('');
  const [prototypeSentence, setPrototype] = useState<string>('');
  const [partOfSpeech, setPartOfSpeech] = useState<string>('');

  useEffect(() => {
    setPrimaryCode(props.primaryCode);
    setConcepts(props.concepts);
    setConceptsTag(props.conceptsTag);
    setWordCount(props.wordCount);
    setBasic(props.basicSentence);

    makeSentencePattern(props.basicSentence).then((res) => {
      setPrototype(res?.pattern || props.prototypeSentence);
      setPartOfSpeech(res?.tagged || '');
    });
  }, []);

  const forceLineBreak = (str: string) => {
    console.log(str);
    const result = [];
    let tempStr = '';
    for (let i = 0; i < str.length; i++) {
      if (i >= 40 && i % 40 == 0) {
        result.push(tempStr);
        result.push(<br key={i} />);
        tempStr = '';
      }
      tempStr += str[i];
    }
    result.push(tempStr);
    return result;
  };

  return (
    <div>
      <Card header={lang.sentence.prototype.subject}>
        {/*<p>{lang.sentence.prototype.description}</p>*/}
        <p></p>
      </Card>
      <Row>
        <Table
          variant="light"
          responsive="sm"
          hover
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
              <td className="bg-white">{concepts.join(', ')}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                개념집합태그
              </th>
              <td className="bg-white">{conceptsTag.join(', ')}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                단어개수
              </th>
              <td className="bg-white">{wordCount}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                기본문장
              </th>
              <td className="bg-white">{basicSentence}</td>
            </tr>
            <tr>
              <th scope="col" className="col-md-4">
                원천데이터 문형
              </th>
              <td className="bg-white">{prototypeSentence}</td>
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

export default Prototype;
