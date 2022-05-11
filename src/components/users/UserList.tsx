import React from 'react';
import { DynamicTable } from '../common/DaynamicTable';

export interface UserInfo {
  no: string | number;
  id: string;
  name: string;
  groupName: string;
  createdAt: string;
  operation: any;
}

export interface UserListProps {
  users: UserInfo[];
}

const UserList = ({ users }: UserListProps) => {
  const schema = {
    no: {
      name: 'No',
      primaryKey: true,
    },
    id: {
      name: '아이디',
    },
    groupName: {
      name: '그룹명',
    },
    type: {
      name: '유형',
    },
    createdAt: {
      name: '등록일',
    },
    operation: {
      name: '운영',
    },
  };

  return (
    <div id="userList">
      <DynamicTable schema={schema} records={users} />
    </div>
  );
};

export default UserList;
