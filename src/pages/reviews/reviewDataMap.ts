import {
  Sentence,
  SentenceReviewReject,
} from '../../store/features/sentence/sentenceAction';
import { ReviewResult, WorkData } from '../../components/common/WorkSpace';
import {
  CreateReview,
  ReviewStatus,
} from '../../store/features/reviews/reviewAction';

const getEtcReason = (reasons: (SentenceReviewReject[] | undefined)[]) => {
  let reason1;
  let reason2;
  let memo1;
  let memo2;
  reason1 = reasons[0];
  reason2 = reasons[1];

  const etc1 = reason1?.filter((r) => {
    return r?.rejectReason == 9;
  })[0];
  reason1 = reason1?.map((r) => {
    return r?.rejectReason;
  });

  const etc2 = reason2?.filter((r) => {
    return r?.rejectReason == 9;
  })[0];

  reason2 = reason2?.map((r) => {
    return r?.rejectReason;
  });

  if (etc1) {
    memo1 = etc1.memo;
  }

  if (etc2) {
    memo2 = etc2.memo;
  }

  return { reason1, reason2, memo1, memo2 };
};

export const sentenceToWorkData = (
  seq: number,
  sentence: Sentence | null,
): WorkData => {
  let result1;
  let result2;
  let rejectReason1;
  let rejectReason2;
  let etcReason;
  let memo1;
  let memo2;

  if (seq == 1) {
    const review1 = sentence?.edges?.sentenceReviews1;
    console.log('hi', sentence);
    if (
      sentence?.status === ReviewStatus.REJECT1 ||
      sentence?.status == ReviewStatus.WAITING
    ) {
      result1 = sentence?.edges?.sentence1.edges?.sentenceReviewReject
        ? ReviewResult.FAIL
        : ReviewResult.PASS;
      result2 = sentence?.edges?.sentence2.edges?.sentenceReviewReject
        ? ReviewResult.FAIL
        : ReviewResult.PASS;

      rejectReason1 = sentence?.edges?.sentence1?.edges?.sentenceReviewReject;
      rejectReason2 = sentence?.edges?.sentence2?.edges?.sentenceReviewReject;

      etcReason = getEtcReason([rejectReason1, rejectReason2]);

      rejectReason1 = etcReason.reason1;
      rejectReason2 = etcReason.reason2;
      memo1 = etcReason.memo1;
      memo2 = etcReason.memo2;
    }
  }

  if (seq == 2) {
    const review2 = sentence?.edges?.sentenceReviews2;
    if (
      sentence?.status === ReviewStatus.REJECT2 ||
      sentence?.status == ReviewStatus.PASS1
    ) {
      result1 = sentence?.edges?.sentence1.edges?.sentenceReviewReject
        ? ReviewResult.FAIL
        : ReviewResult.PASS;
      result2 = sentence?.edges?.sentence2.edges?.sentenceReviewReject
        ? ReviewResult.FAIL
        : ReviewResult.PASS;

      rejectReason1 = sentence?.edges?.sentence1?.edges?.sentenceReviewReject;

      rejectReason2 = sentence?.edges?.sentence2?.edges?.sentenceReviewReject;

      etcReason = getEtcReason([rejectReason1, rejectReason2]);
      rejectReason1 = etcReason.reason1;
      rejectReason2 = etcReason.reason2;
      memo1 = etcReason.memo1;
      memo2 = etcReason.memo2;
    }
  }

  const child1 = sentence?.edges?.sentence1;
  const child2 = sentence?.edges?.sentence2;
  return {
    textArea10: child1?.sentence || '',
    textArea11: child1?.sentencePatternedModified || '',
    textArea20: child2?.sentence || '',
    textArea21: child2?.sentencePatternedModified || '',
    wordCount1: child1?.sentenceCount || 0,
    wordCount2: child2?.sentenceCount || 0,
    origin: [child1?.sentencePatterned || '', child2?.sentencePatterned || ''],
    reviewData: {
      result1: result1 || ReviewResult.FAIL,
      result2: result2 || ReviewResult.FAIL,
      rejectReason1: (rejectReason1 as number[]) || undefined,
      rejectReason2: (rejectReason2 as number[]) || undefined,
      memo1: memo1,
      memo2: memo2,
    },
  };
};

export const workDataToCreateReview = (
  id: number,
  data: WorkData,
): CreateReview => {
  return {
    sentenceId: id || 0,
    sentence1: data.textArea10,
    sentence2: data.textArea20,
    sentence1Patterned: data.origin[0],
    sentence2Patterned: data.origin[1],
    sentence1PatternedModified: data.textArea11,
    sentence2PatternedModified: data.textArea21,
    sentence1Count: data.wordCount1 || 0,
    sentence2Count: data.wordCount2 || 0,
    sentence1Result: data?.reviewData?.result1 as ReviewResult,
    sentence2Result: data?.reviewData?.result2 as ReviewResult,
    sentence1ResultReason: data?.reviewData?.rejectReason1 || undefined,
    sentence2ResultReason: data?.reviewData?.rejectReason2 || undefined,
    memo1: data?.reviewData?.memo1 || undefined,
    memo2: data?.reviewData?.memo2 || undefined,
  };
};
