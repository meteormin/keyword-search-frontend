import { Option } from '../common/Select';
import { CreateStatus } from '../../store/features/search/searchAction';

const CreateState: Option[] = [
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

export default CreateState;
