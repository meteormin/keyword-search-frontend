import { Option } from '../components/common/Select';

const reviewState: Option[] = [
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

const rejectReason: Option[] = [
  {
    name: '1. 단어 수 미흡',
    value: 1,
  },
  {
    name: '2. 전문적인 용어 사용',
    value: 2,
  },
  {
    name: '3.  지나치게 구체적인 지식정보',
    value: 3,
  },
  {
    name: '4. 문형 사용하지 않음',
    value: 4,
  },
  {
    name: '5. 문장 미완료',
    value: 5,
  },
  {
    name: '6. 문장 중복',
    value: 6,
  },
  {
    name: '7. 맞춤법 오류',
    value: 7,
  },
  {
    name: '8. 비속어/은어 사용',
    value: 8,
  },
  {
    name: '9. 기타',
    value: 9,
  },
];

const createState: Option[] = [
  {
    name: '생성대기',
    value: 'wait',
  },
  {
    name: '생성중',
    value: 'ing',
  },
  {
    name: '생성완료',
    value: 'complete',
  },
];

const selectOptions = { rejectReason, reviewState, createState };

export default selectOptions;
