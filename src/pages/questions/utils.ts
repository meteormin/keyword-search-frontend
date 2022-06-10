import { auth, date } from '../../helpers';
import { UserType } from '../../config/UserType';
import {
  Question,
  Questions,
  QuestionDiv,
} from '../../utils/nia15/interfaces/questions';
import { QuestionFormData } from '../../components/questions/QuestionForm';
import { QuestionRecord } from './QuestionSchema';

export const toFormData = (q: Question): QuestionFormData => {
  return {
    id: q.id,
    type: q.edges.questionType.id,
    title: q.title,
    content: q.content,
    div: q.div,
    reply: q.reply,
    fileName: q.fileName,
  };
};

export const toRecord = (q: Questions, i: number): QuestionRecord => {
  return {
    no: i + 1,
    div: q.div,
    type: q.type,
    subject: q.title,
    createdAt: date(q.createdAt).format('yyyy-MM-DD'),
    creatorId: q.userLoginId,
    repliedAt: q.repliedAt ? date(q.repliedAt).format('yyyy-MM-DD') : '미답변',
    replyLoginId: q.replyUserLoginId,
    _origin: q,
  };
};

export const getQuestionDiv = () => {
  let userType: UserType | undefined;
  if (auth) {
    userType = auth.user()?.userType as UserType;
  }

  switch (userType) {
    case UserType.WORKER:
      return QuestionDiv.CREATE;
    case UserType.REVIEWER1:
    case UserType.REVIEWER2:
      return QuestionDiv.REVIEW;
    case UserType.SCORE:
    case UserType.SCORE_REVIEWER:
      return QuestionDiv.SCORE;
    default:
      return;
  }
};
