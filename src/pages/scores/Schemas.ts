import { DynamicSchema } from '../../components/common/DaynamicTable';
import { number } from 'prop-types';
import {
  ScoreAssign,
  ScoreAssignList,
  ScoreList,
} from '../../utils/nia153/interfaces/score';

export const ScoreAssignSchema: DynamicSchema = {
  no: {
    name: 'NO',
    primaryKey: true,
  },
  refId: {
    name: '고유번호',
  },
  concept: {
    name: '개념집합',
  },
  basicSentence: {
    name: '기본문장',
  },
  scoreSentence: {
    name: '평가문장',
  },
};

export interface ScoreAssignRecord {
  no: number;
  refId: number;
  concept: string;
  basicSentence: string;
  scoreSentence: string;
  _origin: ScoreAssignList;
}

export const toAssignRecord = (data: ScoreAssignList): ScoreAssignRecord => {
  return {
    no: data.no,
    refId: data.sentenceId,
    concept: data.concept
      .map((concept) => {
        return concept.stem;
      })
      .join(', '),
    basicSentence: data.basicSentence,
    scoreSentence: data.scoreSentence,
    _origin: data,
  };
};

export const ScoreListSchema: DynamicSchema = {
  no: {
    name: 'NO',
    primaryKey: true,
  },
  refId: {
    name: '고유번호',
  },
  scoreSentence: {
    name: '평가문장',
  },
  grammatical: {
    name: '문법성',
  },
  historicity: {
    name: '사실성',
  },
  fluency: {
    name: '유창성',
  },
  diversity: {
    name: '다양성',
  },
  avg: {
    name: '평균',
  },
  scoreTime: {
    name: '평균 시간',
  },
  createdAt: {
    name: '평가일자',
  },
  reviewStatus: {
    name: '검수상태',
  },
  rejectReason: {
    name: '반려사유',
  },
  reviewedAt: {
    name: '검수일자',
  },
};

export interface ScoreListRecord {
  no: number;
  refId: number;
  scoreSentence: string;
  grammatical: number;
  historicity: number;
  fluency: number;
  diversity: number;
  avg: number;
  scoreTime: number;
  createdAt: string;
  reviewStatus: string;
  rejectReason: string | null;
  reviewedAt: string | null;
  _origin: ScoreList;
}

export const toScoreRecord = (score: ScoreList): ScoreListRecord => {
  return {
    no: score.no,
    refId: score.sentenceId,
    scoreSentence: score.scoreSentence,
    grammatical: score.grammatical,
    historicity: score.historicity,
    fluency: score.fluency,
    diversity: score.diversity,
    avg:
      (score.grammatical +
        score.diversity +
        score.fluency +
        score.historicity) /
      4,
    scoreTime: score.scoreTime,
    createdAt: score.createdAt,
    reviewedAt: score?.scoreReview?.createdAt || '',
    rejectReason: score?.scoreReview?.rejectReason || '',
    reviewStatus: score?.scoreReview?.status || '검수대기',
    _origin: score,
  };
};
