import { DynamicSchema } from '../../components/common/DaynamicTable';
import { date, str } from '../../helpers';
import { Sentence } from '../../utils/nia15/interfaces/sentences';

export const AssignListSchema: DynamicSchema = {
  no: {
    name: 'NO',
  },
  refId: {
    name: '고유번호',
  },
  concepts: {
    name: '개념집합',
  },
  posLength: {
    name: '기본 문장 단어 수',
  },
  sentenceCount: {
    name: '생성 문장 단어 수',
  },
  createdBy: {
    name: '생성자 ID',
  },
  createdAt: {
    name: '생성자 일자',
  },
};

export interface AssignSentence {
  check?: any;
  no: number;
  refId: string;
  concepts: string;
  posLength: number;
  sentenceCount: string;
  createdBy: string;
  createdAt: string;
  _origin: Sentence;
}
