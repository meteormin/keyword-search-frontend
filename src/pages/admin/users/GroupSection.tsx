import GroupList from '../../../components/users/GroupList';
import PermList, { Permission } from '../../../components/users/PermList';
import { config } from '../../../helpers';
import React, { Fragment, useState } from 'react';

const GroupSection = () => {
  const groups = [
    {
      no: 1,
      groupCode: 'G0001',
      groupName: 'create A',
      operation: 'btn',
    },
  ];

  const [groupName, setGroupName] = useState<string>('');
  const [permList, setPermList] = useState<string[] | number[]>([]);
  const createGroup = () => {
    // api 요청 리덕스..
  };

  const changePermCheck = (values: string[] | number[]) => {
    setPermList(values);
    console.log(values);
  };

  return (
    <Fragment>
      <div className="row g-2">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-sm-6">
              <label
                htmlFor="group_name"
                className="col-form-label"
                style={{ fontSize: '1rem' }}
              >
                사용자 그룹
              </label>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="group_name"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <button
            type="button"
            className="btn btn-dark float-end"
            onClick={createGroup}
          >
            생성
          </button>
        </div>
      </div>
      <div className="row mt-4" style={{ height: '25vh', overflowY: 'scroll' }}>
        <GroupList groups={groups} />
      </div>
      <div className="row mt-4">
        <div className="col-lg-7">
          <label htmlFor=""></label>
        </div>
        <div className="col-lg-5"></div>
      </div>
      <div className="row my-4">
        <PermList
          permissions={config.auth.permissions.default as Permission[]}
          onChange={changePermCheck}
        />
      </div>
    </Fragment>
  );
};

export default GroupSection;
