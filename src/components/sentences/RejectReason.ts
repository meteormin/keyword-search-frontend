import { Option } from '../common/Select';

const RejectReason: Option[] = [
  {
    name: '반려 사유 선택',
    value: 0,
  },
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

export default RejectReason;
