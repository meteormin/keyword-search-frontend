import { DynamicSchema } from '../../components/common/DaynamicTable';

export interface ReviewList {
  no: number;
  refId: string;
  concepts: string;
  posLength: number;
  sentenceCount: string;
  creatorId: string;
  createdAt: string;
  reviewState: string;
  reviewReason: string;
  review1At: string;
  review1Id: string;
  review2At: string;
  review2Id: string;
}

export const ReviewListSchema: DynamicSchema = {
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
  creatorId: {
    name: '생성자 ID',
  },
  createdAt: {
    name: '생성일자',
  },
  reviewState: {
    name: '검수상태',
  },
  reviewReason: {
    name: '반려사유',
  },
  review1At: {
    name: '1차 검수일자',
  },
  review1Id: {
    name: '1차 검수자 ID',
  },
  review2At: {
    name: '2차 검수일자',
  },
  review2Id: {
    name: '2차 검수자 ID',
  },
};
