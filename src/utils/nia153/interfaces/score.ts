import { PaginationParameter } from './common';
import { Concept, Sentence, SentenceMaster, SentenceSets } from './sentence';
import { User } from './user';

export interface SearchScores extends PaginationParameter {
  sentenceId?: number;
  concept?: string;
  scoredAtStart?: string;
  scoredAtEnd?: string;
  reviewAtStart?: string;
  reviewAtEnd?: string;
  reviewState?: string;
  rejectReason?: number;
}

export interface SearchAssigns extends PaginationParameter {
  sentenceId?: number | null;
  concept?: string | null;
}

export interface ScoreAssignList {
  no: number;
  id: number;
  user: User;
  sentenceId: number;
  concept: Concept[];
  basicSentence: string;
  scoreSentence: string;
}

export interface ScoreAssign {
  id: number;
  user: User;
  masterId: number;
  setsId: number;
  sentenceId: number;
  concept: Concept[];
  basicSentence: string;
  basicSentenceCount: number;
  scoreSentence: string;
  scoreSentenceCount: number;
}

export interface ScoreList {
  no: number;
  id: number;
  user: User;
  status: string;
  sentenceId: number;
  scoreSentence: string;
  grammatical: number;
  historicity: number;
  diversity: number;
  fluency: number;
  scoreTime: number;
  createdAt: string;
  updatedAt: string;
  scoreReview?: any | null;
}

export interface Score {
  id: number;
  user: User;
  status: string;
  masterId: number;
  setsId: number;
  sentenceId: number;
  concept: Concept[];
  basicSentence: string;
  scoreSentence: string;
  grammatical: number;
  historicity: number;
  diversity: number;
  fluency: number;
  scoreTime: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface PostScore {
  masterId: number;
  setsId: number;
  sentenceId: number;
  grammatical: number;
  historicity: number;
  diversity: number;
  fluency: number;
  scoreTime: number;
  status: string;
}

export interface PatchScore {
  grammatical: number;
  historicity: number;
  diversity: number;
  fluency: number;
  scoreTime: number;
  status: string;
}
