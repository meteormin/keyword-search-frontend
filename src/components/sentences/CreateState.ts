import { Option } from '../common/Select';

const CreateState: Option[] = [
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

export default CreateState;
