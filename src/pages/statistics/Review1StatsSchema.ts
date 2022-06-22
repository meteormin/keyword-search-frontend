import { DynamicSchema } from '../../components/common/DaynamicTable';

export const Review1StatsSchema: DynamicSchema = {
  no: {
    name: 'NO',
  },
  reviewerId: {
    name: '검수자 ID',
  },
  reviewerName: {
    name: '검수자',
  },
  totalReviewed: {
    name: '총 검수 문장 셋 수',
  },
  review1Hold: {
    name: '검수보류',
  },
  review1Pass: {
    name: '1차 승인',
  },
  review1RejectAcc: {
    name: '1차 반려 누적',
  },
  review2RejectAcc: {
    name: '2차 반려 누적',
  },
  review2Pass: {
    name: '2차 승인',
  },
};

export interface Review1StatsRecord {
  no: number | string;
  reviewerId: string;
  reviewerName: string;
  totalReviewed: number;
  review1Hold: number;
  review1Pass: number;
  review1RejectAcc: number;
  review2RejectAcc: number;
  review2Pass: number;
}

export const toRecord = (item: any, i: number): Review1StatsRecord => {
  const totalReviewed = 0; // TODO: 검수보류 + 1차승인 + 1차 반려 누적 + 2차 반려 누적 + 2차 승인

  return {
    no: i + 1,
    reviewerId: 'reviewerId',
    reviewerName: 'reviewerName',
    totalReviewed: totalReviewed,
    review1Hold: 0,
    review1Pass: 0,
    review1RejectAcc: 0,
    review2RejectAcc: 0,
    review2Pass: 0,
  };
};
