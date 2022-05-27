import React, { Fragment, useEffect, useState } from 'react';
import UserList, { UserInfo } from '../../components/users/UserList';
import UserForm from '../../components/users/UserForm';
import { config, date } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { toCamel } from 'snake-camel';
import { User } from '../../store/features/users/userAction';
import { Method } from '../../components/users/formTypes';
import { Button, Col, Row } from 'react-bootstrap';

const UserSection = () => {
  const dispatch = useDispatch();
  const { currentGroup, users, editUser } = useSelector(
    usersModule.getUsersState,
  );

  const [userModal, showUserModal] = useState(false);
  const [modalMethod, setModalMethod] = useState<Method>(Method.CREATE);
  const createUser = () => {
    showUserModal(true);
    setModalMethod(Method.CREATE);
  };
  const updateUser = () => {
    showUserModal(true);
    setModalMethod(Method.UPDATE);
  };

  const userInfo = (): UserInfo[] => {
    return users.map((user, index) => {
      const userType = config.auth.userTypes.filter(
        (type) => type.value == user.userType,
      )[0];

      const userInfo: UserInfo = {
        _pk: user.id,
        no: index + 1,
        id: user.loginId,
        name: user.name,
        groupName: currentGroup.name,
        type: userType?.name || user.userType,
        createAt: date(user.createAt).format('yyyy.MM.DD'),
        operation: (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              dispatch(usersModule.actions.getEditUser(user.id));
              updateUser();
            }}
          >
            수정
          </button>
        ),
      };

      return userInfo;
    });
  };

  useEffect(() => {
    console.log('grp:', currentGroup);
    if (currentGroup.id) {
      console.log('get Users');
      dispatch(
        usersModule.actions.setUsers(
          (currentGroup.edges?.users?.map(toCamel) as User[]) || [],
        ),
      );
    }
  }, [currentGroup, editUser]);

  return (
    <Fragment>
      <Row className="justify-content-end align-items-end">
        <Col lg={4} className="ms-0">
          <strong>사용자</strong>
          <span className="ms-4 text-secondary">{currentGroup.name}</span>
        </Col>
        <Col lg={8} className="ms-0">
          {currentGroup ? (
            <Button variant="dark" className="float-end" onClick={createUser}>
              사용자 등록
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row className="mt-4" style={{ height: '90vh', overflowY: 'scroll' }}>
        <UserList users={userInfo()} />
      </Row>
      <UserForm
        show={userModal}
        formInfo={{
          method: modalMethod,
          userTypes: config.auth.userTypes,
        }}
        onSave={() => null}
        onResetPass={() => {
          if (editUser?.id) {
            console.log('press resetPassword');
            dispatch(usersModule.actions.resetPassword(editUser?.id));
          }
        }}
        onHide={() => showUserModal(false)}
      />
    </Fragment>
  );
};

export default UserSection;
