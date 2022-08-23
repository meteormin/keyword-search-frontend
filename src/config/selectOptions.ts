import { Option } from '../components/common/Select';
import {
  AssignStatus,
  CreateStatus,
  ReviewStatus,
} from '../utils/nia15/interfaces/search';
import { IdStateEnum } from '../components/reviews/IdState';
import { SearchNames } from '../components/tasks/DataSearch';

const ReviewState: Option[] = [
  {
    name: '검수 상태 선택',
    value: ReviewStatus.NONE,
  },
  {
    name: '검수대기',
    value: ReviewStatus.WAIT,
  },
  {
    name: '승인',
    value: ReviewStatus.PASS,
  },
  {
    name: '반려',
    value: ReviewStatus.REJECT,
  },
];

const RejectReason: Option[] = [
  {
    name: '반려 사유 선택',
    value: 0,
  },
  {
    name: '1. 평가시간 부적합',
    value: 1,
  },
  {
    name: '2. 평가 평균값 부적합',
    value: 2,
  },
  {
    name: '3. 평가값 이상치',
    value: 3,
  },
  {
    name: '4. 평가 데이터 오류',
    value: 4,
  },
  {
    name: '5. 기본 데이터 오류(평가 제외 문장)',
    value: 5,
  },
  {
    name: '6. 기타',
    value: 6,
  },
];

const CreateState: Option[] = [
  {
    name: '검색어 선택',
    value: '',
  },
  {
    name: '생성대기',
    value: CreateStatus.WAITING,
  },
  {
    name: '생성중',
    value: CreateStatus.TEMP,
  },
  {
    name: '생성완료',
    value: CreateStatus.CREATED,
  },
];

const IdState: Option[] = [
  {
    name: '검색어 선택',
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
    name: '검색어 선택',
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

// 전체 통계 관련
const DataStatsSearchOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '생성자 ID', value: 'creatorID' },
  { name: '생성자명', value: 'creatorName' },
  { name: '검수자 ID', value: 'reviewerID' },
  { name: '검수자명', value: 'reviewerName' },
  { name: '주제', value: 'domain' },
  { name: '개념집합', value: 'concept' },
  { name: '고유코드', value: 'refID' },
];

const AssignStatusOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '검수대기', value: AssignStatus.WAITING },
  { name: '재검수대기', value: AssignStatus.R_WAITING },
  { name: '검수보류', value: AssignStatus.HOLD1 },
  { name: '1차 승인', value: AssignStatus.PASS1 },
  { name: '1차 반려', value: AssignStatus.REJECT1 },
  { name: '2차 승인', value: AssignStatus.PASS2 },
  { name: '2차 반려', value: AssignStatus.REJECT2 },
];

const SentenceStatusOptions: Option[] = [
  { name: '선택', value: '' },
  { name: '검수대기', value: '' },
  { name: '재검수대기', value: '' },
  { name: '검수보류', value: '' },
];

// 생성자 통계 관련
const CreatorSearchOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '생성자명', value: 'creatorName' },
  { name: '생성자 ID', value: 'creatorID' },
];

const ReviewerSearchOptions: Option[] = [
  { name: '검색어 선택', value: '' },
  { name: '검수자명', value: 'reviewerName' },
  { name: '검수자 ID', value: 'reviewerID' },
];

const GenderOptions: Option[] = [
  { name: '남', value: 'm' },
  { name: '여', value: 'f' },
];

const AgeOptions: Option[] = [
  { name: '10대', value: '10' },
  { name: '20대', value: '20' },
  { name: '30대', value: '30' },
  { name: '40대', value: '40' },
  { name: '50대', value: '50' },
  { name: '60대', value: '60' },
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
  AssignStatusOptions,
  SentenceStatusOptions,
  ReviewerSearchOptions,
  GenderOptions,
  AgeOptions,
};

export default selectOptions;
