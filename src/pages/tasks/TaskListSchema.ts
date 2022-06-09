import { DynamicSchema } from '../../components/common/DaynamicTable';
import { Task } from '../../utils/nia15/interfaces/tasks';

export const TaskListSchema: DynamicSchema = {
  no: {
    name: 'NO',
  },
  id: {
    name: '고유번호',
  },
  conceptSet: {
    name: '개념집합',
  },
  wordCount: {
    name: '기본 문장 단어수',
  },
};

export interface TaskRecord {
  no: number;
  id: string;
  conceptSet: string;
  wordCount: number;
  _origin: Task;
}
