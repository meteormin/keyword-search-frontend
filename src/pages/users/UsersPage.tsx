import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import Search from '../../components/users/Search';
import GroupSection from './GroupSection';
import { GroupInfo } from '../../components/users/GroupList';
import UserSection from './UserSection';
import usersModule from '../../store/features/users';
import { useDispatch, useSelector } from 'react-redux';
import PermList, { Permission } from '../../components/users/PermList';
import { config } from '../../helpers';

export interface SearchState {
  id: string | number;
  name: string;
  permission: string | number;
}

const UsersPage = () => {
  const dispatch = useDispatch();
  const { currentGroup, editGroup, search, groups, users } = useSelector(
    usersModule.getUsersState,
  );

  const [permList, setPermList] = useState<number[]>([]);

  return (
    <div className="container">
      <div className="row justify-content ms-1">
        <div className="col-lg-12 mt-4">
          <Search
            {...search}
            onSubmit={(id, name, permission) => {
              console.log(id, name, permission);
              dispatch(
                usersModule.searchUser({
                  id: id as string,
                  name: name,
                  permission: permission as string,
                }),
              );
            }}
          />
        </div>
        <div className="row mt-4">
          <hr />
        </div>
        <div className="col-lg-4 mt-4 me-2">
          <GroupSection />
        </div>
        <div className="col-lg-7 mt-4 ms-4">
          <UserSection users={users} currentGroup={currentGroup} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
