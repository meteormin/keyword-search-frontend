import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import Select, { Option } from '../common/Select';
import { useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { Method } from './formTypes';
import { Button, Col, Row } from 'react-bootstrap';

export interface FormInfo {
  method: Method;
  userTypes: Option[];
}

const UserForm = ({
  formInfo,
  show,
  onHide,
  onSave,
  onResetPass,
  onDelete,
}: {
  formInfo: FormInfo;
  show: boolean;
  onHide: () => any;
  onSave: () => any;
  onResetPass?: () => any;
  onDelete?: () => any;
}) => {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [userType, setUserType] = useState<string>();
  const [_show, setShow] = useState<boolean>(false);
  const { editUser } = useSelector(usersModule.getUsersState);

  useEffect(() => {
    setShow(show);
    if (show && formInfo.method == Method.UPDATE) {
      if (editUser) {
        setId(editUser.loginId);
        setName(editUser.name);
        setUserType(editUser.userType);
      }
    } else {
      setId('');
      setName('');
      setUserType('');
    }
  }, [editUser, show]);
  const makeButton = () => {
    switch (formInfo.method) {
      case Method.CREATE:
        return (
          <Row className="justify-content-end">
            <Col md={4} className="offset-4">
              <Button
                variant="dark"
                className="float-end"
                onClick={() => {
                  onHide();
                  onSave();
                }}
              >
                저장
              </Button>
            </Col>
          </Row>
        );
      case Method.UPDATE:
        return (
          <Row className="justify-content-end">
            <Col sm={8} className="offset-4">
              <Button
                variant="dark"
                className="mx-4"
                onClick={() => {
                  onHide();
                  if (onResetPass) {
                    onResetPass();
                  }
                }}
              >
                암호초기화
              </Button>
              <Button
                variant="dark"
                className="mx-2"
                onClick={() => {
                  onHide();
                  onSave();
                }}
              >
                수정
              </Button>
              <Button
                variant="dark"
                className="float-end"
                onClick={() => {
                  onHide();
                  if (onDelete) {
                    onDelete();
                  }
                }}
              >
                삭제
              </Button>
            </Col>
          </Row>
        );
    }
  };
  return (
    <FormModal header={'사용자 등록'} show={_show} onHide={onHide}>
      <Input
        type={'text'}
        id={'id'}
        label={'아이디'}
        name={'id'}
        value={id}
        readonly={formInfo.method == Method.UPDATE}
      />
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'이름'}
          name={'name'}
          value={name}
        />
      </div>
      <div className="mt-3">
        <Select
          id={'permission'}
          label={'사용자 권한'}
          name={'permission'}
          selectedValue={userType}
          options={formInfo.userTypes}
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default UserForm;
