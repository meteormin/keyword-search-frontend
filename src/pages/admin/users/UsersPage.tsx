import React, { useState } from 'react';
import Search from '../../../components/users/Search';
import GroupSection from './GroupSection';
import UserSection from './UserSection';

export interface Search {
  id: string;
  name: string;
  permission: string;
}

const UsersPage = () => {
  const [search, setSearch] = useState<Search>({
    id: '',
    name: '',
    permission: '',
  });

  return (
    <div className="container">
      <div className="row justify-content">
        <div className="col-lg-12 mt-4">
          <Search
            onSubmit={(id, name, permission) => {
              console.log(id, name, permission);
              setSearch({
                id: id as string,
                name: name,
                permission: permission as string,
              });
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
          <UserSection />
        </div>
      </div>

      {/*<CreateUserForm*/}
      {/*  show={userModal}*/}
      {/*  onSubmit={() => null}*/}
      {/*  onHide={() => showUserModal(false)}*/}
      {/*/>*/}
    </div>
  );
};

export default UsersPage;
