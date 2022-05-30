import { Option } from '../components/common/Select';
import { ReviewStatus } from '../store/features/search/searchAction';
import { CreateStatus } from '../store/features/search/searchAction';
import { IdStateEnum } from '../components/reviews/IdState';
import { SearchNames } from '../components/tasks/DataSearch';

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

const RejectReason: Option[] = [
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

const CreateState: Option[] = [
  {
    name: '선택',
    value: '',
  },
  {
    name: '생성대기',
    value: CreateStatus.WAITING,
  },
  {
    name: '생성중',
    value: 'ing',
  },
  {
    name: '생성완료',
    value: CreateStatus.CREATED,
  },
];

const IdState: Option[] = [
  {
    name: '선택',
    value: IdStateEnum.NONE,
  },
  {
    name: '생성그룹명',
    value: IdStateEnum.GROUP_NAME,
  },
  {
    name: '생성자 ID',
    value: IdStateEnum.CREATOR_ID,
  },
  {
    name: '1차 검수자 ID',
    value: IdStateEnum.REVIEWER1_ID,
  },
  {
    name: '2차 검수자 ID',
    value: IdStateEnum.REVIEWER2_ID,
  },
];

const DataSearchNames = [
  {
    name: '선택',
    value: SearchNames.NONE,
  },
  {
    name: '개념집합',
    value: SearchNames.CONCEPT,
  },
  {
    name: '고유번호',
    value: SearchNames.REF_ID,
  },
  {
    name: '주제',
    value: SearchNames.DOMAIN,
  },
];

const selectOptions = {
  RejectReason,
  ReviewState,
  CreateState,
  IdState,
  DataSearchNames,
};

export default selectOptions;
