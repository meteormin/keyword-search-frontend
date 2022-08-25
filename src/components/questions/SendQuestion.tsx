import React, { Fragment, useState } from 'react';
import QuestionForm, { QuestionFormData } from './QuestionForm';
import { Button } from 'react-bootstrap';
import { QuestionDiv } from '../../utils/nia153/interfaces/question';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';

export interface SendQuestionProps {
  isReply?: boolean;
  div: QuestionDiv;
  onSubmit?: (data: QuestionFormData) => any;
}

const SendQuestion = (props: SendQuestionProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const { create } = useSelector(questionModule.getQuestionState);
  return (
    <Fragment>
      <Button
        variant="dark"
        className="float-end mt-1"
        onClick={() => setShow(true)}
      >
        <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
      </Button>
      <QuestionForm
        isReply={props.isReply || false}
        method={'create'}
        div={props.div}
        show={show}
        onSubmit={(data) => {
          dispatch(
            questionModule.actions.create({
              title: data.title,
              content: data.content,
              div: data.div,
              type: data.type,
              document: data.file,
            }),
          );

          if (props.onSubmit) {
            props.onSubmit(data);
          }
          setShow(false);
        }}
        onHide={() => setShow(false)}
      />
    </Fragment>
  );
};

export default SendQuestion;
