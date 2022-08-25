import { lang } from '../../helpers';

export const switchReviewStatus = (
  status: string,
): { reviewStatus: string; createStatus: string } => {
  switch (status) {
    default:
      return {
        reviewStatus: '',
        createStatus: '',
      };
  }
};
