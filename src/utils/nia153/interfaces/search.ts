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

export interface StatsSearch extends PaginationParameter {}
