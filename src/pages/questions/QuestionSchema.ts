import { DynamicSchema } from '../../components/common/DaynamicTable';
import { Questions } from '../../store/features/questions/questionAction';

export const QuestionSchema: DynamicSchema = {
  no: {
    name: 'NO',
    primaryKey: true,
  },
  div: {
    name: '구분',
  },
  type: {
    name: '문의유형',
  },
  subject: {
    name: '제목',
  },
  createdAt: {
    name: '작성일자',
  },
  creatorId: {
    name: '작성자 ID',
  },
  repliedAt: {
    name: '답변여부 (답변일자)',
  },
  replyLoginId: {
    name: '답변자 ID',
  },
};

export interface QuestionRecord {
  no: number;
  div: string;
  type: string;
  subject: string;
  createdAt: string;
  creatorId: string;
  repliedAt: string;
  replyLoginId: string;
  _origin: Questions;
}
