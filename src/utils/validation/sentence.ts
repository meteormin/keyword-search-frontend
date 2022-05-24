import { CreateSentence } from '../../store/features/sentence/sentenceAction';
import { Task } from '../../store/features/tasks/taskAction';
import { Message, ValidateData, Validator } from './Validator';

export const sentenceValidate = (
  task: Task,
  create: CreateSentence,
): ValidateData => {
  const msg: Message[] = [];

  // 단어 개수 체크
  if ((task?.posLength || 0) > create.sentence1Count) {
    msg.push({
      key: '문장1',
      message: '단어 개수를 지켜 문장을 생성해 주세요.',
    });
  }

  if ((task?.posLength || 0) > create.sentence2Count) {
    msg.push({
      key: '문장2',
      message: '단어 개수를 지켜 문장을 생성해 주세요.',
    });
  }

  // 문장 입력 체크
  if (!create.sentence1) {
    msg.push({
      key: '문장1',
      message: '문장을 입력해 주세요.',
    });
  }

  if (!create.sentence2) {
    msg.push({
      key: '문장2',
      message: '문장을 입력해 주세요.',
    });
  }

  // 문형 만들기 여부 체크
  if (!create.sentence1Patterned) {
    msg.push({
      key: '문형1',
      message: '문형을 만들어 주세요.',
    });
  }

  if (!create.sentence2Patterned) {
    msg.push({
      key: '문형2',
      message: '문형을 만들어 주세요.',
    });
  }

  // 기본 원천 데이터 문형과 새로 생성한 문형 체크
  if (
    create.sentence1PatternedModified == task.tagged ||
    create.sentence1Patterned == task.tagged
  ) {
    msg.push({
      key: '문형1',
      message:
        '생성 문장의 문형이 원천 데이터 문형과 동일합니다. 새로운 문형을 생성해 주세요.',
    });
  }

  if (
    create.sentence2PatternedModified == task.tagged ||
    create.sentence2Patterned == task.tagged
  ) {
    msg.push({
      key: '문형2',
      message:
        '생성 문장의 문형이 원천 데이터 문형과 동일합니다. 새로운 문형을 생성해 주세요.',
    });
  }

  return new Validator(msg.length == 0, msg);
};
