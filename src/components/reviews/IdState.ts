import { Option } from '../common/Select';

export enum IdStateEnum {
  GROUP_NAME,
  CREATOR_ID,
  REVIEWER1_ID,
  REVIEWER2_ID,
}

const IdState: Option[] = [
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
