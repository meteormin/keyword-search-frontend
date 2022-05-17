import React, { Fragment, useEffect, useState } from 'react';
import Card from '../common/Card';
import { lang } from '../../helpers';
import { Table } from 'react-bootstrap';

export interface PrototypeProps {
  concepts: string[];
  conceptsTag: string[];
  wordCount: number;
  basicSentence: string;
  prototypeSentence: string;
}

const Prototype = (props: PrototypeProps) => {
  const [concepts, setConcepts] = useState<string[]>([]);
  const [conceptsTag, setConceptsTag] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [basicSentence, setBasic] = useState<string>('');
  const [prototypeSentence, setPrototype] = useState<string>('');

  useEffect(() => {
    setConcepts(props.concepts);
    setConceptsTag(props.conceptsTag);
    setWordCount(props.wordCount);
    setBasic(props.basicSentence);
    setPrototype(props.prototypeSentence);
  }, [props]);

  return (
    <Fragment>
      <Card header={lang.sentence.prototype.subject}>
        <p>{lang.sentence.prototype.description}</p>
      </Card>
      <Table
        variant="light"
        responsive="sm"
        hover
        className={'align-content-center'}
        bordered
      >
        <tbody>
          <tr>
            <th scope="col">개념집합</th>
            <td className="bg-white">{concepts.join(', ')}</td>
          </tr>
          <tr>
            <th scope="col">개념집합</th>
            <td className="bg-white">{conceptsTag.join(', ')}</td>
          </tr>
          <tr>
            <th scope="col">단어개수</th>
            <td className="bg-white">{wordCount}</td>
          </tr>
          <tr>
            <th scope="col">기본문장</th>
            <td className="bg-white">{basicSentence}</td>
          </tr>
          <tr>
            <th scope="col">원천데이터 문형</th>
            <td className="bg-white">{prototypeSentence}</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Prototype;
