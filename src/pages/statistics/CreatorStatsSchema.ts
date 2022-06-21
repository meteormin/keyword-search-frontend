import { DynamicSchema } from '../../components/common/DaynamicTable';
import { Creator } from '../../utils/nia15/interfaces/statics';

export const CreatorStatsSchema: DynamicSchema = {
  no: {
    name: 'No',
  },
  creatorId: {
    name: '담당자 ID',
  },
  creatorName: {
    name: '담당자',
  },
  totalCreated: {
    name: '총 생성 문장 셋 수',
  },
  temp: {
    name: '작성 중',
  },
  wait: {
    name: '검수 대기',
  },
  reWait: {
    name: '재검수 대기',
  },
  review1Pass: {
    name: '1차 승인',
  },
  review1RejectAcc: {
    name: '1차 반려(누적)',
  },
  review2RejectAcc: {
    name: '2차 반려(누적)',
  },
  review2Pass: {
    name: '최종 승인',
  },
};

export interface CreatorStatsRecord {
  no: number | string;
  creatorId: string;
  creatorName: string;
  totalCreated: number;
  temp: number;
  wait: number;
  reWait: number;
  hold1: number;
  review1Reject: number;
  review1Pass: number;
  review1RejectAcc: number;
  review2Reject: number;
  review2RejectAcc: number;
  review2Pass: number;
}

export const toRecord = (item: Creator, i: number): CreatorStatsRecord => {
  const totalCreated =
    item.waiting +
    item.temp +
    item.waitingR +
    item.pass1 +
    item.reject1 +
    item.reject2 +
    item.pass2;

  return {
    no: i + 1,
    creatorId: item.loginId,
    creatorName: item.name,
    totalCreated: totalCreated,
    temp: item.temp,
    wait: item.waiting,
    reWait: item.waitingR,
    hold1: item.hold1,
    review1Pass: item.pass1,
    review1Reject: item.reject1,
    review1RejectAcc: item.reject1Acc,
    review2Reject: item.reject2,
    review2RejectAcc: item.reject2Acc,
    review2Pass: item.pass2,
  };
};
