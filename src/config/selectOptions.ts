import { Option } from '../components/common/Select';
import { ReviewStatus, CreateStatus } from '../utils/nia15/interfaces/search';
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
    name: '9. 동일한 문장',
    value: 10,
  },
  {
    name: '10. 문장의 이질성',
    value: 11,
  },
  {
    name: '11. 기타',
    value: 9, // 기타 9 고정
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

const CreateConditions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '인간의 삶', value: '인간의 삶' },
  { name: '사회', value: '사회' },
  { name: '경제', value: '경제' },
  { name: '정치와 행정', value: '정치와 행정' },
  { name: '법과 보안', value: '법과 보안' },
  { name: '건강', value: '건강' },
  { name: '취미와 운동', value: '취미와 운동' },
  { name: '종교 생활', value: '종교 생활' },
  { name: '예술', value: '예술' },
  { name: '역사', value: '역사' },
  { name: '언어와 문학', value: '언어와 문학' },
  { name: '철학 및 교육', value: '철학 및 교육' },
  { name: '공학과 정보 통신', value: '공학과 정보 통신' },
  { name: '자연 환경', value: '자연 환경' },
  { name: '생물 과학', value: '생물 과학' },
  { name: '순수 과학', value: '순수 과학' },
  { name: '기타', value: '기타' },
];

// 전체 톨계 관련
const DataStatsSearchOptions: Option[] = [
  { name: '생성자 ID', value: 'creatorID' },
  { name: '생성자명', value: 'creatorName' },
  { name: '검수자 ID', value: 'reviewerID' },
  { name: '검수자명', value: 'reviewerName' },
  { name: '주제', value: 'domain' },
  { name: '개념집합', value: 'concept' },
  { name: '고유코드', value: 'refID' },
];

const AssignStatusOptions: Option[] = [
  { name: '생성 할당', value: '' },
  { name: '1차 검수', value: '' },
  { name: '2차 검수', value: '' },
];

// 생성자 통계 관련
const CreatorSearchOptions: Option[] = [
  { name: '생성자명', value: 'creatorName' },
  { name: '생성자 ID', value: 'creatorID' },
];

const selectOptions = {
  RejectReason,
  ReviewState,
  CreateState,
  IdState,
  DataSearchNames,
  CreateConditions,
  DataStatsSearchOptions,
  CreatorSearchOptions,
};

export default selectOptions;
