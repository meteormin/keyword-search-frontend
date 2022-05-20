import { Sentence } from '../../store/features/sentence/sentenceAction';
import { ReviewResult, WorkData } from '../../components/common/WorkSpace';
import { CreateReview } from '../../store/features/reviews/reviewAction';

export const sentenceToWorkData = (
  seq: number,
  sentence: Sentence | null,
): WorkData => {
  let result1;
  let result2;
  let rejectReason1;
  let rejectReason2;
  let memo1;
  let memo2;

  if (seq == 1) {
    const review1 = sentence?.edges?.sentenceReviews1;
    result1 = review1?.sentence1Result;
    result2 = review1?.sentence2Result;
    rejectReason1 = review1?.edges?.sentenceReject1?.map((reject) => {
      const filtered = review1?.edges?.sentenceReject1?.filter((reject) => {
        return reject.sentenceNumber == 1;
      });
      return filtered?.includes(reject) ? reject : undefined;
    });
    rejectReason2 = review1?.edges?.sentenceReject1?.map((reject) => {
      const filtered = review1?.edges?.sentenceReject1?.filter((reject) => {
        return reject.sentenceNumber == 2;
      });
      return filtered?.includes(reject) ? reject : undefined;
    });

    const etc = rejectReason1?.filter((r) => {
      return r?.sentenceRejectCode == 9;
    })[0];
    rejectReason1 = rejectReason1?.map((r) => {
      return r?.sentenceRejectCode;
    });

    const etc2 = rejectReason2?.filter((r) => {
      return r?.sentenceRejectCode == 9;
    })[0];

    rejectReason2 = rejectReason2?.map((r) => {
      return r?.sentenceRejectCode;
    });

    if (etc) {
      memo1 = etc.memo;
    }

    if (etc2) {
      memo2 = etc2.memo;
    }
  }

  if (seq == 2) {
    const review2 = sentence?.edges?.sentenceReviews2;
    result1 = review2?.sentence1Result;
    result2 = review2?.sentence2Result;
    rejectReason1 = review2?.edges?.sentenceReject2?.map((reject) => {
      const filtered = review2?.edges?.sentenceReject2?.filter((reject) => {
        return reject.sentenceNumber == 1;
      });
      return filtered?.includes(reject) ? reject : undefined;
    });
    rejectReason2 = review2?.edges?.sentenceReject2?.map((reject) => {
      const filtered = review2?.edges?.sentenceReject2?.filter((reject) => {
        return reject.sentenceNumber == 2;
      });
      return filtered?.includes(reject) ? reject : undefined;
    });

    const etc = rejectReason1?.filter((r) => {
      return r?.sentenceRejectCode == 9;
    })[0];
    rejectReason1 = rejectReason1?.map((r) => {
      return r?.sentenceRejectCode;
    });

    const etc2 = rejectReason2?.filter((r) => {
      return r?.sentenceRejectCode == 9;
    })[0];
    rejectReason2 = rejectReason2?.map((r) => {
      return r?.sentenceRejectCode;
    });

    if (etc) {
      memo1 = etc.memo;
    }

    if (etc2) {
      memo2 = etc2.memo;
    }
  }

  return {
    textArea10: sentence?.sentence1 || '',
    textArea11: sentence?.sentence1PatternedModified || '',
    textArea20: sentence?.sentence2 || '',
    textArea21: sentence?.sentence2PatternedModified || '',
    wordCount1: sentence?.sentence1Count || 0,
    wordCount2: sentence?.sentence2Count || 0,
    origin: [
      sentence?.sentence1Patterned || '',
      sentence?.sentence2Patterned || '',
    ],
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
