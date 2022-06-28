export enum CreateStatus {
  WAITING = 'WAITING',
  TEMP = 'TEMP',
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

export enum AssignStatus {
  TEMP = 'TEMP',
  WAITING = 'WAITING',
  HOLD1 = 'HOLD_1',
  REJECT1 = 'REJECT_1',
  REJECT2 = 'REJECT_2',
  PASS1 = 'PASS_1',
  PASS2 = 'PASS_2',
  R_WAITING = 'R_WAITING',
}

export interface StatsSearchParameter extends SearchParameter {
  creatorID?: string;
  creatorName?: string;
  reviewerID?: string;
  reviewerName?: string;
  userID?: string;
  name?: string;
  groupName?: string;
  assignStatus?: AssignStatus;
  taskID?: number[];
}
