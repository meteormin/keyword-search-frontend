import React, { Fragment, useEffect, useState } from 'react';
import UserList, { UserInfo } from '../../components/users/UserList';
import CreateUserForm from '../../components/users/CreateUserForm';
import { config } from '../../helpers';
import { Group, User } from '../../store/features/users/usersAction';

export interface UserSectionProps {
  currentGroup: Group;
  users: User[];
}

const UserSection = ({ currentGroup, users }: UserSectionProps) => {
  const [_currentGroup, setGroup] = useState(currentGroup);
  const [_users, setUsers] = useState(
    users.map((user) => {
      const userInfo: UserInfo = {
        no: user.id,
        id: user.loginId,
        name: user.name,
        groupName: user.groupName,
        type: user.userType,
        createdAt: user.createdAt,
        operation: (
          <button
            type="button"
            className="btn btn-dark"
            onClick={updateUser}
          ></button>
        ),
      };

      return userInfo;
    }),
  );

  const [userModal, showUserModal] = useState(false);
  const [modalMethod, setModalMethod] = useState<'create' | 'edit'>('create');
  const createUser = () => {
    showUserModal(true);
    setModalMethod('create');
  };
  const updateUser = () => {
    showUserModal(true);
    setModalMethod('edit');
  };

  useEffect(() => {
    console.log('grp:', currentGroup);
    console.log('get Users');
    setGroup(currentGroup);
  }, [currentGroup]);

  return (
    <Fragment>
      <div className="row justify-content-end align-items-end">
        <div className="col-lg-4 ms-0 ">
          <strong>사용자</strong>
          <span className="ms-4 text-secondary">{_currentGroup.name}</span>
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
        <UserList users={_users} />
      </div>
      <CreateUserForm
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
