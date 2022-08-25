import { User } from './user';
import { Score, ScoreAssign } from './score';

export interface ScoreReview {
  id: number;
  user: User;
  score: Score;
  status: string;
}

export interface ScoreReviewAssign extends ScoreAssign {
  scores: Score[];
}
