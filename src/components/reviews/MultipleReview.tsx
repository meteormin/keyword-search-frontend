import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { config } from '../../helpers';
import CheckBoxOption from '../common/CheckBoxOption';
import ReactSelect from 'react-select';

export interface MRProps {
  onSubmit: (data: MRData) => any;
  onHide: () => any;
  show: boolean;
  action: 'pass' | 'reject';
}

export interface MRData {
  action: 'pass' | 'reject';
  reasons?: number[];
  memo?: string;
}

const MultipleReview = (props: MRProps) => {
  const [show, setShow] = useState(false);
  const [rejectReason, setRejectReason] = useState<number[]>();
  const [memo, setMemo] = useState<string>('');
  useEffect(() => {
    setShow(props.show);
  }, []);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const reasonList = config.selectOptions.RejectReason.map((opt) => {
    return opt.value as number;
  });

  const reasonOptions = config.selectOptions.RejectReason.map((opt) => {
    return {
      label: opt.name,
      value: opt.value,
    };
  });

  const selectReason = (
    <Fragment>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label className={'mb-3'}>반려사유 선택</Form.Label>
            <ReactSelect
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CheckBoxOption,
              }}
              id="rejectReason"
              name="rejectReason"
              options={reasonOptions}
              onChange={(e) => {
                const multiCheck = e.map((v: any): number => v.value);
                setRejectReason(multiCheck);
              }}
              placeholder={'반력 사유 선택'}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          {rejectReason?.includes(reasonList[reasonList.length - 1]) ? (
            <Form.Group>
              <Form.Label controlid={'memo'} className="mb-3">
                기타 사유
              </Form.Label>
              <Form.Control
                as="textarea"
                name={'memo'}
                value={memo}
                placeholder="기타 사유"
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </Form.Group>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  );
  const submit = () => {
    props.onSubmit({
      action: props.action,
      reasons: rejectReason,
      memo: memo || undefined,
    });
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => {
        setShow(false);
        props.onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          선택 문장 일괄 {props.action == 'pass' ? '승인하기' : '반려하기'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.action == 'pass' ? (
          <span className={'my-4'}>
            선택한 개념집합의 문장을 일괄 승인 하시겠습니까?
          </span>
        ) : (
          selectReason
        )}
        <Row className={'mt-4'}>
          <Col>
            <Button
              variant={'dark'}
              className={'w-50 float-end'}
              onClick={() => {
                setShow(false);
                props.onHide();
              }}
            >
              취소
            </Button>
          </Col>
          <Col>
            <Button
              variant={'dark'}
              className={'w-50'}
              onClick={() => {
                submit();
              }}
            >
              확인
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default MultipleReview;
