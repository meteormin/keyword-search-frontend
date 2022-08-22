import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import Select, { Option } from '../common/Select';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { Method } from './formTypes';
import { Button, Col, Row } from 'react-bootstrap';
import { UserType } from '../../config/UserType';
import alertModal from '../../store/features/common/alertModal';

export interface FormInfo {
  method: Method;
  userTypes: Option[];
  genderTypes: Option[];
  ageTypes: Option[];
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
  const [userId, setUserId] = useState<number | null>(null);
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>('');
  const [userType, setUserType] = useState<string>(UserType.ADMIN);
  const [_show, setShow] = useState<boolean>(false);
  const [gender, setGender] = useState<string | null>();
  const [age, setAge] = useState<string | null>();
  const { editUser, currentGroup } = useSelector(usersModule.getUsersState);

  const createUser = () => {
    if (!id) {
      dispatch(
        alertModal.showAlert({
          title: '유효성 검사 실패',
          message: '아이디는 필수 값입니다.',
        }),
      );
      return;
    }

    dispatch(
      usersModule.actions.saveUser({
        id: userId,
        loginId: id,
        name: name,
        groupId: currentGroup.id,
        gender: gender || null,
        age: age || null,
        userType: userType,
      }),
    );
  };

  useEffect(() => {
    setShow(show);
    if (show && formInfo.method == Method.UPDATE) {
      if (editUser) {
        setUserId(editUser.id);
        setId(editUser.loginId);
        setName(editUser.name);
        setUserType(editUser.userType);
        setGender(editUser.gender);
        setAge(editUser.age);
      }
    } else {
      setId('');
      setName('');
      setUserType(UserType.ADMIN);
      setGender(null);
      setAge(null);
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
                  createUser();
                  onSave();
                  onHide();
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
          selectedValue={userType || UserType.ADMIN}
          options={formInfo.userTypes}
          onChange={(e) =>
            setUserType(e.target.options[e.target.selectedIndex].value)
          }
        />
      </div>
      <div className="mt-3">
        <Select
          id={'gender'}
          label={'성별'}
          name={'gender'}
          selectedValue={gender || 'm'}
          options={formInfo.genderTypes}
          onChange={(e) =>
            setGender(e.target.options[e.target.selectedIndex].value)
          }
        />
      </div>
      <div className="mt-3">
        <Select
          id={'age'}
          label={'연령'}
          name={'age'}
          selectedValue={age || '10'}
          options={formInfo.ageTypes}
          onChange={(e) =>
            setAge(e.target.options[e.target.selectedIndex].value)
          }
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default UserForm;
