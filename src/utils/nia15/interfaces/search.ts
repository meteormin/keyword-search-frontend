export enum CreateStatus {
  WAITING = 'WAITING',
  CREATED = 'CREATED',
}

export enum ReviewStatus {
  NONE,
  WAITING = 'WAITING',
  REJECT1 = 'REJECT1',
  PASS1 = 'PASS1',
  REJECT2 = 'REJECT2',
  PASS2 = 'PASS2',
}

export interface SearchParameter {
  limit?: number;
  page?: number;
  reviewStatus?: ReviewStatus;
  createdAtStart?: string;
  createdAtEnd?: string;
  reviewedAtStart?: string;
  reviewedAtEnd?: string;
  rejectReason?: number;
  createStatus?: CreateStatus;
  refID?: number;
  domain?: string;
  concept?: string;
  sentenceGroupName?: string;
  sentenceUserID?: string;
  review1UserID?: string;
  review2UserID?: string;
}

export interface StatsSearchParameter extends SearchParameter {
  userID?: string;
  name?: string;
  groupName?: string;
  assignStatus?: string;
  taskID?: number[];
}
