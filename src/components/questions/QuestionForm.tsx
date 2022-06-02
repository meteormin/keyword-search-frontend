import React, { useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { QuestionDiv } from '../../store/features/questions/questionAction';
import Select from '../common/Select';
import { QuestionTypeOptions } from './QuestionTypes';

export interface QuestionFormData {
  id?: number;
  type: number;
  title: string;
  content: string;
  div: QuestionDiv;
  reply?: string;
  file?: File | null;
  fileName: string;
}

export interface QuestionFormProps {
  isReply: boolean;
  method: 'create' | 'edit';
  div: QuestionDiv;
  show: boolean;
  onHide: () => any;
  onSubmit: (data: QuestionFormData) => any;
  defaultData?: QuestionFormData;
}

const QuestionForm = (props: QuestionFormProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [reply, setReply] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [div, setDiv] = useState<QuestionDiv>(QuestionDiv.CREATE);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    setShow(props.show);
  }, []);

  return (
    <Modal show={show} dialogClassName={'modal-80w'}>
      <Modal.Header closeButton>
        <Modal.Title>
          문의 글{props.isReply ? '답변하기' : '작성하기'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          id="q_type"
          name="q_type"
          label="문의 유형"
          readOnly={props.method == 'edit'}
          options={QuestionTypeOptions}
          selectedValue={type}
          onChange={(e) => {
            const option = e.target.options[e.target.selectedIndex];
            setType(parseInt(option.value));
          }}
        />
        <Form.Group className={'mt-2'}>
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            readOnly={props.method == 'edit'}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className={'mt-2'}>
          <Form.Label>내용입력</Form.Label>
          <Form.Control
            as="textarea"
            readOnly={props.method == 'edit'}
            value={content}
            rows={5}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className={'mt-2'}>
          <Form.Label>첨부파일</Form.Label>
          <Form.Control
            type="file"
            readOnly={props.method == 'edit'}
            accept="image/gif,image/jpeg,image/png"
            onChange={(e) => {
              if ('files' in e.target) {
                const files = e.target?.files;
                if (files != null) {
                  const file = files[0];
                  setFile(file);
                  setFileName(file.name);
                }
              }
            }}
          />
        </Form.Group>
        {props.method == 'edit' ? (
          <Form.Group className={'mt-2'}>
            <Form.Label>답변</Form.Label>
            <Form.Control
              type="file"
              readOnly
              value={fileName}
              accept="image/gif,image/jpeg,image/png"
              onChange={(e) => {
                if ('files' in e.target) {
                  const files = e.target?.files;
                  if (files != null) {
                    const file = files[0];
                    setFile(file);
                  }
                }
              }}
            />
          </Form.Group>
        ) : null}
        <Row>
          <Col lg={6} className={'mt-4'}>
            <Button
              className={'w-100'}
              variant={'light'}
              onClick={() => props.onHide()}
            >
              취소
            </Button>
          </Col>
          <Col lg={6} className={'mt-4'}>
            {props.method == 'create' ? (
              <Button
                className={'w-100'}
                variant={'dark'}
                onClick={() =>
                  props.onSubmit({
                    type: type,
                    title: title,
                    content: content,
                    div: div,
                    reply: reply,
                    file: file,
                    fileName: fileName,
                  })
                }
              >
                문의 등록하기
              </Button>
            ) : props.method == 'edit' ? (
              <Button
                className={'w-100'}
                variant={'dark'}
                onClick={() =>
                  props.onSubmit({
                    id: props.defaultData?.id,
                    type: type,
                    title: title,
                    content: content,
                    div: div,
                    reply: reply,
                    file: file,
                    fileName: fileName,
                  })
                }
              >
                삭제
              </Button>
            ) : null}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default QuestionForm;
