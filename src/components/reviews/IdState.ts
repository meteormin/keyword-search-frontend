import { Option } from '../common/Select';

export enum IdStateEnum {
  NONE,
  GROUP_NAME,
  CREATOR_ID,
  REVIEWER1_ID,
  REVIEWER2_ID,
}

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

export default IdState;
