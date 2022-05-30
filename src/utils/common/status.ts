import { ReviewStatus } from '../../store/features/reviews/reviewAction';
import { lang } from '../../helpers';

export const switchReviewStatus = (
  status: ReviewStatus,
): { reviewStatus: string; createStatus: string } => {
  switch (status) {
    case ReviewStatus.PASS1:
      return {
        reviewStatus: lang.sentence.reviewState.review1.pass,
        createStatus: lang.sentence.createState.complete,
      };
    case ReviewStatus.PASS2:
      return {
        reviewStatus: lang.sentence.reviewState.review2.pass,
        createStatus: lang.sentence.createState.complete,
      };
    case ReviewStatus.REJECT1:
      return {
        reviewStatus: lang.sentence.reviewState.review1.fail,
        createStatus: lang.sentence.createState.wait,
      };
    case ReviewStatus.REJECT2:
      return {
        reviewStatus: lang.sentence.reviewState.review2.fail,
        createStatus: lang.sentence.createState.wait,
      };
    case ReviewStatus.WAITING:
      return {
        reviewStatus: lang.sentence.reviewState.common.wait,
        createStatus: lang.sentence.createState.complete,
      };
  }
};
