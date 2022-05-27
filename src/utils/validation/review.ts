import { sentenceValidate } from './sentence';
import { CreateReview } from '../../store/features/reviews/reviewAction';
import { Task } from '../../store/features/tasks/taskAction';
import { Sentence } from '../../store/features/sentence/sentenceAction';
import { Message, Validator } from './Validator';

export const reviewValidate = (
  reviewSentence: Sentence,
  create: CreateReview,
) => {
  const msg: Message[] = [];
  const validated = sentenceValidate(reviewSentence.edges?.task as Task, {
    sentence1: create.sentence1,
    sentence2: create.sentence2,
    sentence1Patterned: create.sentence1Patterned,
    sentence2Patterned: create.sentence2Patterned,
    sentence1PatternedModified: create.sentence1PatternedModified,
    sentence2PatternedModified: create.sentence2PatternedModified,
    sentence1Count: create.sentence1Count,
    sentence2Count: create.sentence2Count,
    taskId: reviewSentence.taskId,
  });

  if (reviewSentence.edges?.sentence1.sentence != create.sentence1) {
    if (!create.sentence1PatternedModified) {
      msg.push({
        key: '문장1',
        message: '수정 후 문형1(을)를 수정하지 않았습니다.',
      });
    } else {
      if (!validated.status) {
        return validated;
      }
    }
  }

  if (reviewSentence.edges?.sentence2.sentence != create.sentence2) {
    if (!create.sentence2PatternedModified) {
      msg.push({
        key: '문장2',
        message: '수정 후 문형2(을)를 수정하지 않았습니다.',
      });
    } else {
      if (!validated.status) {
        return validated;
      }
    }
  }

  return new Validator(msg.length == 0, msg);
};
