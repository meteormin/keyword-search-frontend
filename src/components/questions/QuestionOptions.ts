import { Option } from '../common/Select';

export const SearchNames: Option[] = [
  {
    name: '검색어 선택',
    value: '',
  },
  {
    name: '제목',
    value: 'title',
  },
  {
    name: '작성자 ID',
    value: 'userId',
  },
];

export const QuestionTypeOptions: Option[] = [
  {
    name: '작성방법',
    value: 1,
  },
  {
    name: '문형',
    value: 2,
  },
  {
    name: '문형변환',
    value: 3,
  },
  {
    name: '문법',
    value: 4,
  },
  {
    name: '검수',
    value: 5,
  },
  {
    name: '기타',
    value: 6,
  },
];

export const IsRepliedOptions: Option[] = [
  {
    name: '답변 여부 선택',
    value: -1,
  },
  {
    name: '미답변',
    value: 0,
  },
  {
    name: '답변완료',
    value: 1,
  },
];
