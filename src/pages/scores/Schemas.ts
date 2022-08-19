import { DynamicSchema } from '../../components/common/DaynamicTable';
import { number } from 'prop-types';
import {
  ScoreAssign,
  ScoreAssignList,
} from '../../utils/nia153/interfaces/score';

export const ScoreAssignSchema: DynamicSchema = {
  no: {
    name: 'NO',
    primaryKey: true,
  },
  refId: {
    name: '고유번호',
  },
  concept: {
    name: '개념집합',
  },
  basicSentence: {
    name: '기본문장',
  },
  scoreSentence: {
    name: '평가문장',
  },
};

export interface ScoreAssignRecord {
  no: number;
  refId: number;
  concept: string;
  basicSentence: string;
  scoreSentence: string;
  _origin: ScoreAssignList;
}

export const toRecord = (data: ScoreAssignList): ScoreAssignRecord => {
  return {
    no: data.no,
    refId: data.sentenceId,
    concept: data.concept
      .map((concept) => {
        return concept.stem;
      })
      .join(', '),
    basicSentence: data.basicSentence,
    scoreSentence: data.scoreSentence,
    _origin: data,
  };
};
