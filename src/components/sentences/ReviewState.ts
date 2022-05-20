import { Option } from '../common/Select';

const ReviewState: Option[] = [
  {
    name: '검수대기',
    value: 'wait',
  },
  {
    name: '1차승인',
    value: 'first',
  },
  {
    name: '1차반려',
    value: 'rejectFirst',
  },
  {
    name: '2차승인',
    value: 'second',
  },
  {
    name: '2차반려',
    value: 'rejectSecond',
  },
];

export default ReviewState;
