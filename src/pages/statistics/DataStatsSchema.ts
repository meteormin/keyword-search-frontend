import { DynamicSchema } from '../../components/common/DaynamicTable';
import { StatsTask, Task } from '../../utils/nia15/interfaces/statics';
import { date } from '../../helpers';
import { limitArray } from '../../utils/str';
import { switchReviewStatus } from '../../utils/common/status';

export const DataStatsSchema: DynamicSchema = {
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
  currentState: {
    name: '현재상태',
  },
  createdAt: {
    name: '생성일자',
  },
  createdBy: {
    name: '생성자',
  },
  createSentenceCount: {
    name: '생성문장 단어수',
  },
  review1At: {
    name: '1차 검수일자',
  },
  review1By: {
    name: '1차 검수자',
  },
  review2At: {
    name: '2차 검수일자',
  },
  review2By: {
    name: '2차 검수자',
  },
  rejectReason: {
    name: '반려사유',
  },
  createAssign: {
    name: '생성할당',
  },
  review1Assign: {
    name: '1차 검수할당',
  },
  review2Assign: {
    name: '2차 검수할당',
  },
};

export interface DataStatsRecord {
  no: number;
  refId: string | number;
  concepts: string;
  posLength: number;
  currentState: string;
  createdAt: string;
  createdBy: string;
  createSentenceCount: string;
  review1At: string;
  review1By: string;
  review2At: string;
  review2By: string;
  rejectReason: string;
  createAssign: string;
  review1Assign: string;
  review2Assign: string;
}

export const toRecord = (item: Task, i: number): DataStatsRecord => {
  let createSentenceCount = '';
  if (item.sentence1Length || item.sentence2Length) {
    createSentenceCount = `${item.sentence1Length || ''}/${
      item.sentence2Length || ''
    }`;
  }

  return {
    no: i + 1,
    refId: item.refId,
    concepts: limitArray(item?.concepts, 5),
    posLength: item.taskLength,
    currentState: switchReviewStatus(item.status || '').reviewStatus,
    createdAt: item.createdAt ? date(item.createdAt).format('YYYY.MM.DD') : '',
    createdBy: item.creatorId || '',
    createSentenceCount: createSentenceCount,
    review1At: item.reviewer1At
      ? date(item.reviewer1At).format('YYYY.MM.DD')
      : '',
    review1By: item.reviewer1Id || '',
    review2At: item.reviewer2At
      ? date(item.reviewer1At).format('YYYY.MM.DD')
      : '',
    review2By: item.reviewer2Id || '',
    rejectReason: (item.rejectReasons || []).join(','),
    createAssign: item.createAssignId || '',
    review1Assign: item.review1AssignId || '',
    review2Assign: item.review2AssignID || '',
  };
};
