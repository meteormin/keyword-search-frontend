export enum QuestionDiv {
  CREATE = 'create',
  REVIEW = 'review',
  SCORE = 'score',
}

export interface QuestionUser {
  id: number;
  loginId: string;
  userType: string;
  name: string;
  updateAt: string;
  createAt: string;
}

export interface Questions {
  id: number;
  title: string;
  type: string;
  div: QuestionDiv;
  createdAt: string;
  repliedAt: string;
  userId: number;
  userLoginId: string;
  replyUserId: number;
  replyUserLoginId: string;
}

export interface QuestionType {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  div: QuestionDiv;
  reply: string;
  fileName: string;
  filePath: string;
  createdAt: string;
  repliedAt: string;
  edges: {
    user: QuestionUser;
    replyUser?: QuestionUser;
    questionType: QuestionType;
  };
}

export interface QuestionSearch {
  title?: string;
  type?: string;
  userId?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isReplied?: boolean;
  limit?: number;
  page?: number;
}

export interface CreateQuestion {
  title: string;
  content: string;
  type: number;
  div: QuestionDiv;
  document?: File | null;
}
