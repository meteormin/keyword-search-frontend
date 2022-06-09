import { Sentence } from './sentences';
import { ReviewResult } from '../../../components/common/WorkSpace';
import { Concept } from './tasks';

export interface SentenceReview extends Sentence {
  status: ReviewStatus;
}

export interface CreateReview {
  sentenceId: number;
  sentence1: string;
  sentence2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  sentence1Count: number;
  sentence2Count: number;
  sentence1Result: ReviewResult;
  sentence2Result: ReviewResult;
  sentence1ResultReason?: number[];
  sentence2ResultReason?: number[];
  memo1?: string;
  memo2?: string;
}

export interface UpdateReview extends Sentence {
  id: number;
  sentence1Result: ReviewResult;
  sentence2Result: ReviewResult;
  sentence1ResultReason: number[];
  memo1: string;
  memo2: string;
}

export enum ReviewStatus {
  WAITING = 'WAITING',
  REJECT1 = 'REJECT_1',
  PASS1 = 'PASS_1',
  REJECT2 = 'REJECT_2',
  PASS2 = 'PASS_2',
  TEMP = 'TEMP',
  HOLD = 'HOLD_1',
}

export interface Review {
  id: number;
  refId: string;
  concepts: Concept[];
  posLength: number;
  created1Length: number;
  created2Length: number;
  creatorId: string;
  createdAt: string;
  review1Id: number;
  reviewer1Id: string;
  review2Id: number;
  reviewer2Id: string;
  review1At: string;
  review2At: string;
  reviewResult: ReviewStatus;
  reviewReasons: number[];
  reviewRsTxt?: string;
}
