import { DynamicSchema } from '../../components/common/DaynamicTable';
import { number } from 'prop-types';

export const ScoreListSchema: DynamicSchema = {
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

export interface ScoreListRecord {
  no: number;
  refId: number;
  concept: string;
  basicSentence: string;
  scoreSentence: string;
}

