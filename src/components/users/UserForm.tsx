import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import Select, { Option } from '../common/Select';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [_show, setShow] = useState<boolean>(false);
  const { editUser, currentGroup } = useSelector(usersModule.getUsersState);

  const createUser = () => {
    dispatch(
      usersModule.actions.saveUser({
        loginId: id,
        name: name,
        userType: userType,
        groupId: currentGroup.id,
      }),
    );
  };

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
                  createUser();
                  onSave();
                  onHide();
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
                  if (onResetPass) {
                    onResetPass();
                  }
                  onHide();
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
                  if (onDelete) {
                    onDelete();
                  }
                  onHide();
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
        onChange={(e) => setId(e.target.value)}
      />
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'이름'}
          name={'name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <Select
          id={'permission'}
          label={'사용자 권한'}
          name={'permission'}
          selectedValue={userType}
          options={formInfo.userTypes}
          onChange={(e) =>
            setUserType(e.target.options[e.target.selectedIndex].value)
          }
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default UserForm;
