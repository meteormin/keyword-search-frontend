import { PaginationParameter } from './common';

export interface Search extends PaginationParameter {
  concept?: string | null;
  sentenceId?: string | number | null;
}

export interface StatsSearch extends PaginationParameter {}
