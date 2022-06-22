import { ReviewStatus } from './reviews';

export interface StatsTask {
  count: number;
  task: Task[];
}

export interface StatsCreator {
  count: number;
  statistic: Creator[];
}

// TODO: 1차 검수, 2차 검수 API 나오면 ㄱㄱ
export interface StatsReviewer1 {
  count: number;

  statistic: any[];
}

//
// export interface StatsReviewer2 {}

export interface Task {
  id: number;
  refId: number | string;
  domain: string;
  concepts: string[];
  taskLength: number;
  status: ReviewStatus;
  createdAt: string | null;
  creatorId: string | null;
  sentence1Length: number;
  sentence2Length: number;
  reviewer1Id: string | null;
  reviewer1At: string | null;
  reviewer2Id: string | null;
  reviewer2At: string | null;
  rejectReasons: number[] | null;
  createAssignId: string | null;
  review1AssignId: string | null;
  review2AssignID: string | null;
}

export interface Creator {
  id: number;
  loginId: string;
  name: string;
  temp: number;
  waiting: number;
  waitingR: number;
  hold1: number;
  reject1: number;
  reject2: number;
  pass1: number;
  pass2: number;
  reject1Acc: number;
  reject2Acc: number;
}
