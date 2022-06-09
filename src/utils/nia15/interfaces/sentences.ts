import { ReviewStatus, SentenceReview } from './reviews';
import { Concept, Task } from './tasks';
import { User } from './users';

export interface SentenceReviewReject {
  id: number;
  memo: string;
  rejectReason: number;
}

export interface SentenceChild {
  id: number;
  sentence: string;
  sentenceCount: number;
  sentencePatterned: string;
  sentencePatternedModified: string;
  edges?: {
    sentenceReviewReject: SentenceReviewReject[];
  };
}

export interface Sentence {
  id: number;
  status: ReviewStatus;
  taskId: number;
  userId: number;
  createAt?: string | null;
  updateAt?: string | null;
  edges?: {
    task: Task;
    user: User;
    sentence1: SentenceChild;
    sentence2: SentenceChild;
    sentenceReviews1: SentenceReview;
    sentenceReviews2: SentenceReview;
  };
}

export interface CreateSentence {
  sentence1: string;
  sentence2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  sentence1Count: number;
  sentence2Count: number;
  taskId: number;
}

export interface SentenceHistory {
  id: number;
  status: ReviewStatus;
  refId: string;
  concepts: Concept[];
  posLength: number;
  created1Length: number;
  created2Length: number;
  createState?: string;
  creatorId: string;
  createdAt: string;
  reviewer1Id: string;
  review1At: string;
  reviewer2Id: string;
  review2At: string;
  reviewResult: ReviewStatus;
  reviewRsTxt?: string;
  reviewReasons: number[];
}
