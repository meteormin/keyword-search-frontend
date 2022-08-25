import { PaginationParameter } from './common';

export interface Search extends PaginationParameter {
  concept?: string | null;
  sentenceId?: string | number | null;
  scoredAtStart?: string | null;
  scoredAtEnd?: string | null;
  reviewAtStart?: string | null;
  reviewAtEnd?: string | null;
  reviewState?: string | null;
  rejectReason?: number | null;
}

export interface StatsSearch extends PaginationParameter {
  stats: any;
}

export enum ReviewStatus {
  NONE,
  WAIT = 'WAIT',
  PASS = 'PASS',
  REJECT = 'REJECT',
}

export enum SearchNames {
  NONE,
  CONCEPT,
  REF_ID,
}

export enum IdStateEnum {
  NONE,
  GROUP_NAME,
  CREATOR_ID,
  REVIEWER1_ID,
  REVIEWER2_ID,
}
