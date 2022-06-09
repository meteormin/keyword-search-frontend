import { DynamicSchema } from '../../components/common/DaynamicTable';
import { SentenceHistory } from '../../utils/nia15/interfaces/sentences';

export const SentenceListSchema: DynamicSchema = {
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
  sentenceState: {
    name: '생성상태',
  },
  createdAt: {
    name: '생성일자',
  },
  reviewState: {
    name: '검수상태',
  },
  rejectReason: {
    name: '반려사유',
  },
  reviewAt: {
    name: '검수일자',
  },
};

export interface SentenceRecord {
  no: number;
  refId: string;
  concepts: string;
  posLength: number;
  sentenceState: string;
  createdAt: string;
  reviewState: string;
  rejectReason: string;
  reviewAt: string;
  _origin: SentenceHistory;
}
