import { Option } from '../../components/common/Select';
import { QuestionTypeOptions as Origin } from '../../components/questions/QuestionTypes';

export const SearchOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '제목', value: 'subject' },
  { name: '자성자 ID', value: 'creatorId' },
];

export const QuestionTypeOptions: Option[] = Origin;

export const AnswerOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '미답변', value: 0 },
  { name: '답변', value: 1 },
];
