import { DynamicSchema } from '../../components/common/DaynamicTable';
import { Reviewer1, Reviewer2 } from '../../utils/nia15/interfaces/statics';

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
  totalReworked: {
    name: '총 재검수 문장 셋 수',
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
  totalReworked: number;
  review1Hold: number;
  review1Pass: number;
  review1RejectAcc: number;
  review2RejectAcc: number;
  review2Pass: number;
}

export const toRecord1 = (item: Reviewer1, i: number): Review1StatsRecord => {
  const totalReviewed =
    item.hold1 + item.pass1 + item.reject1Acc + item.reject2Acc + item.pass2;

  return {
    no: i + 1,
    reviewerId: item.loginId,
    reviewerName: item.name,
    totalReviewed: totalReviewed,
    totalReworked: item.rework,
    review1Hold: item.hold1,
    review1Pass: item.pass1,
    review1RejectAcc: item.reject1Acc,
    review2RejectAcc: item.reject2Acc,
    review2Pass: item.pass2,
  };
};

export const setFirstRow1 = (
  records: Review1StatsRecord[],
): Review1StatsRecord[] => {
  const firstRow: Review1StatsRecord = {
    no: '',
    reviewerId: '전체',
    reviewerName: '전체',
    totalReviewed: 0,
    totalReworked: 0,
    review1Hold: 0,
    review1Pass: 0,
    review1RejectAcc: 0,
    review2RejectAcc: 0,
    review2Pass: 0,
  };

  records.forEach((item) => {
    firstRow.totalReviewed += item.totalReviewed;
    firstRow.review1Hold += item.review1Hold;
    firstRow.review1Pass += item.review1Pass;
    firstRow.review1RejectAcc += item.review1RejectAcc;
    firstRow.review2RejectAcc += item.review2RejectAcc;
    firstRow.review2Pass += item.review2Pass;
    firstRow.totalReworked += item.totalReworked;
  });
  records.unshift(firstRow);

  return records;
};

export const Review2StatsSchema: DynamicSchema = {
  no: {
    name: 'NO',
  },
  reviewerId: {
    name: '담당자 ID',
  },
  reviewerName: {
    name: '담당자',
  },
  review2ReviewHoldAcc: {
    name: '1차 검수 보류 검수',
  },
  totalReviewed: {
    name: '총 검수 문장 셋 수',
  },
  totalReworked: {
    name: '총 재검수 문장 셋 수',
  },
  review2RejectAcc: {
    name: '2차 반려 (누적)',
  },
  review2Pass: {
    name: '최종 승인',
  },
};

export interface Review2StatsRecord {
  no: number | string;
  reviewerId: string;
  reviewerName: string;
  totalReviewed: number;
  totalReworked: number;
  review2ReviewHoldAcc: number;
  review2RejectAcc: number;
  review2Pass: number;
}

export const toRecord2 = (item: Reviewer2, i: number): Review2StatsRecord => {
  const totalReviewed =
    item.reviewer2ReviewHoldAcc + item.reject2Acc + item.pass2;

  return {
    no: i + 1,
    reviewerId: item.loginId,
    reviewerName: item.name,
    review2ReviewHoldAcc: item.reviewer2ReviewHoldAcc,
    totalReviewed: totalReviewed,
    totalReworked: item.rework,
    review2RejectAcc: item.reject2Acc,
    review2Pass: item.pass2,
  };
};

export const setFirstRow2 = (
  records: Review2StatsRecord[],
): Review2StatsRecord[] => {
  const firstRow: Review2StatsRecord = {
    no: '',
    reviewerId: '전체',
    reviewerName: '전체',
    review2ReviewHoldAcc: 0,
    totalReviewed: 0,
    totalReworked: 0,
    review2RejectAcc: 0,
    review2Pass: 0,
  };

  records.forEach((item) => {
    firstRow.totalReviewed += item.totalReviewed;
    firstRow.review2ReviewHoldAcc += item.review2ReviewHoldAcc;
    firstRow.review2RejectAcc += item.review2RejectAcc;
    firstRow.review2Pass += item.review2Pass;
    firstRow.totalReworked += item.totalReworked;
  });
  records.unshift(firstRow);

  return records;
};
