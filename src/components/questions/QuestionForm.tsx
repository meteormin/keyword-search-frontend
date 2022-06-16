import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import Select from '../common/Select';
import { QuestionTypeOptions } from './QuestionOptions';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';
import fileDownload from 'js-file-download';

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
  onSubmit: (data: QuestionFormData) => any;
  onHide: () => any;
  defaultData?: QuestionFormData | null;
}

const QuestionForm = (props: QuestionFormProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [reply, setReply] = useState<string>('');
  const [fileState, setFile] = useState<File | null>(null);
  const [div, setDiv] = useState<QuestionDiv>(QuestionDiv.CREATE);
  const [fileName, setFileName] = useState<string>('');
  const { file } = useSelector(questionModule.getQuestionState);

  useEffect(() => {
    setShow(props.show);
    if (props.defaultData) {
      setFormData(props?.defaultData);
    }

    if (!props.show) {
      setFormData(null);
    }
  }, [props]);

  useEffect(() => {
    if (file) {
      const split = fileName.split('.');
      const ext = split[split.length - 1];

      fileDownload(file, fileName, 'image/' + ext);
    }
  }, [file]);

  const setFormData = (formData: QuestionFormData | null) => {
    setType(formData?.type || 1);
    setTitle(formData?.title || '');
    setContent(formData?.content || '');
    setReply(formData?.reply || '');
    setDiv(formData?.div || QuestionDiv.CREATE);
    setFileName(formData?.fileName || '');
  };

  const handleDownload = () => {
    if (props.defaultData) {
      if (props.defaultData.id) {
        dispatch(questionModule.actions.getFileById(props.defaultData.id));
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        props.onHide();
      }}
      dialogClassName={'modal-80w'}
    >
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
          readOnly={
            props.method == 'edit' ||
            (props.method == 'create' && props.isReply)
          }
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
            readOnly={
              props.method == 'edit' ||
              (props.method == 'create' && props.isReply)
            }
            placeholder={'제목을 입력해 주세요.'}
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
            readOnly={
              props.method == 'edit' ||
              (props.method == 'create' && props.isReply)
            }
            value={content}
            placeholder={'내용을 입력해 주세요.'}
            rows={5}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className={'mt-2'}>
          <Form.Label>첨부파일</Form.Label>
          {props.method == 'create' && !props.isReply ? (
            <Form.Control
              type="file"
              readOnly={props.method == 'create' && props.isReply}
              disabled={props.method == 'create' && props.isReply}
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
          ) : (
            <InputGroup>
              <Form.Control
                type={'text'}
                readOnly={true}
                value={fileName || '첨부된 파일이 없습니다.'}
              />
              <Button variant={'dark'} onClick={handleDownload}>
                내려받기
              </Button>
            </InputGroup>
          )}
        </Form.Group>
        {props.method == 'edit' ||
        (props.method == 'create' && props.isReply) ? (
          <Form.Group className={'mt-2'}>
            <Form.Label>답변</Form.Label>
            <Form.Control
              as="textarea"
              readOnly={!props.isReply}
              value={reply}
              rows={5}
              onChange={(e) => {
                setReply(e.target.value);
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
                    id: props.defaultData?.id,
                    type: type,
                    title: title,
                    content: content,
                    div: div,
                    reply: reply,
                    file: fileState,
                    fileName: fileName,
                  })
                }
              >
                {props.isReply ? '답변저장' : '문의 등록하기'}
              </Button>
            ) : props.method == 'edit' ? (
              <Button
                className={'w-100'}
                variant={'dark'}
                onClick={() => {
                  props.onSubmit({
                    id: props.defaultData?.id,
                    type: type,
                    title: title,
                    content: content,
                    div: div,
                    reply: reply,
                    file: file,
                    fileName: fileName,
                  });
                }}
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
