import React, { Fragment, useState } from 'react';
import UserList from '../../../components/users/UserList';

const UserSection = () => {
  const users = [
    {
      no: 1,
      id: 'testworks',
      name: 'name',
      groupName: 'create A',
      type: 'worker',
      createdAt: '2022-05-10',
      operation: 'btn',
    },
  ];

  const [userModal, showUserModal] = useState(false);

  const createUser = () => {
    showUserModal(true);
  };

  return (
    <Fragment>
      <div className="row justify-content-end align-items-end">
        <div className="col-lg-12 ms-5 ">
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
        <UserList users={users} />
      </div>
    </Fragment>
  );
};

export default UserSection;
