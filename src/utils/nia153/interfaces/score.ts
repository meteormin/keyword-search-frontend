import { PaginationParameter } from './common';
import { Concept, Sentence, SentenceMaster, SentenceSets } from './sentence';
import { User } from './user';

export interface SearchScores extends PaginationParameter {
  scoredAtStart?: string;
  scoredAtEnd?: string;
  reviewAtStart?: string;
  reviewAtEnd?: string;
  reviewState?: string;
  rejectReason?: number;
}

export interface SearchAssigns extends PaginationParameter {
  sentenceId?: number;
  concept?: string;
}

export interface ScoreAssign {
  id: number;
  user: User;
  sentenceId: number;
  concept: Concept[];
  basicSentence: string;
  scoreSentence: string;
}

export interface Score {
  id: number;
  sentenceId: number;
  userId: number;
  status: string;
  sentenceMaster: SentenceMaster;
  sentenceSets: SentenceSets;
  sentence: Sentence;
  grammatical: number;
  historicity: number;
  diversity: number;
  fluency: number;
  score_time: number;
  created_at: string;
  updated_at: string;
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
