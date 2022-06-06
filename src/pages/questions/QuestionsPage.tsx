import React from 'react';
import { UserType } from '../../config/UserType';
import ManageQuestions from './ManageQuestions';
import QuestionListPage from './QuestionListPage';

export interface QuestionsProps {
  userType: UserType;
}

const QuestionsPage = (props: QuestionsProps) => {
  if (props.userType == UserType.ADMIN) {
    return <ManageQuestions />;
  } else {
    return <QuestionListPage />;
  }
};

export default QuestionsPage;
