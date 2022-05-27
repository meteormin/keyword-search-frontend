import { Option } from '../common/Select';
import { ReviewStatus } from '../../store/features/search/searchAction';

const ReviewState: Option[] = [
  {
    name: ' 검수 상태 선택',
    value: ReviewStatus.NONE,
  },
  {
    name: '검수대기',
    value: ReviewStatus.WAITING,
  },
  {
    name: '1차승인',
    value: ReviewStatus.PASS1,
  },
  {
    name: '1차반려',
    value: ReviewStatus.REJECT1,
  },
  {
    name: '2차승인',
    value: ReviewStatus.PASS2,
  },
  {
    name: '2차반려',
    value: ReviewStatus.REJECT2,
  },
];

export default ReviewState;
