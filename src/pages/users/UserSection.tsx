import React, { Fragment, useEffect, useState } from 'react';
import UserList, { UserInfo } from '../../components/users/UserList';
import UserForm from '../../components/users/UserForm';
import { config, date } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { toCamel } from 'snake-camel';
import { User } from '../../store/features/users/usersAction';
import { Method } from '../../components/users/formTypes';

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
      const userInfo: UserInfo = {
        _pk: user.id,
        no: index + 1,
        id: user.loginId,
        name: user.name,
        groupName: currentGroup.name,
        type: user.userType,
        createAt: date(user.createAt).format('yyyy.MM.DD'),
        operation: (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              dispatch(usersModule.getEditUser(user.id));
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
        usersModule.setUsers(
          (currentGroup.edges?.users?.map(toCamel) as User[]) || [],
        ),
      );
    }
  }, [currentGroup, editUser]);

  return (
    <Fragment>
      <div className="row justify-content-end align-items-end">
        <div className="col-lg-4 ms-0 ">
          <strong>사용자</strong>
          <span className="ms-4 text-secondary">{currentGroup.name}</span>
        </div>
        <div className="col-lg-8 ms-0 ">
          <button
            type="button"
            className="btn btn-dark float-end"
            onClick={createUser}
          >
            사용자 등록
          </button>
        </div>
      </div>
      <div className="row mt-4" style={{ height: '90vh', overflowY: 'scroll' }}>
        <UserList users={userInfo()} />
      </div>
      <UserForm
        show={userModal}
        formInfo={{
          method: modalMethod,
          userTypes: config.auth.userTypes,
        }}
        onSave={() => null}
        onHide={() => showUserModal(false)}
      />
    </Fragment>
  );
};

export default UserSection;
