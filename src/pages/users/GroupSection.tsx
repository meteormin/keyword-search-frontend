import GroupList, { GroupInfo } from '../../components/users/GroupList';
import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import CreateGroupForm from '../../components/users/CreateGroupForm';

const GroupSection = () => {
  const dispatch = useDispatch();

  const { permList, groups, editGroup } = useSelector(
    usersModule.getUsersState,
  );

  const [groupModal, showGroupModal] = useState(false);
  const [modalMethod, setModalMethod] = useState<'create' | 'edit'>('create');

  const createGroup = () => {
    showGroupModal(true);
    setModalMethod('create');
    getPermList();
  };
  const updateGroup = () => {
    showGroupModal(true);
    setModalMethod('edit');
  };
  const getGroup = (id: number) => {
    dispatch(usersModule.getGroup(id));
  };

  const getPermList = () => {
    dispatch(usersModule.getPermList());
  };

  const makeModifyButton = (
    onClick: (e: MouseEvent<HTMLButtonElement>) => any,
  ) => {
    return (
      <button type="button" className="btn btn-dark" onClick={onClick}>
        수정
      </button>
    );
  };

  const groupInfo = (): GroupInfo[] => {
    return groups.map((group, index) => {
      const groupInfo: GroupInfo = {
        no: index + 1,
        id: group.id || 0,
        groupCode: group.code || '',
        groupName: group.name || '',
        operation: makeModifyButton(() => {
          if (group.id) {
            dispatch(usersModule.getEditGroup(group.id));
          }
        }),
      };

      return groupInfo;
    });
  };

  useEffect(() => {
    dispatch(usersModule.getGroups());
  }, []);

  useEffect(() => {
    console.log('change edit group');
    if (editGroup?.id) {
      updateGroup();
    }
  }, [editGroup]);

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
                <strong>사용자 그룹</strong>
              </label>
            </div>
            <div className="col-sm-6">
              {/*<input*/}
              {/*  className="form-control"*/}
              {/*  id="group_name"*/}
              {/*  type="text"*/}
              {/*  value={groupName}*/}
              {/*  onChange={(e) => setGroupName(e.target.value)}*/}
              {/*/>*/}
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
        <GroupList
          groups={groupInfo()}
          onClick={(group: GroupInfo) => {
            getGroup(group.id);
          }}
        />
      </div>
      <CreateGroupForm
        formInfo={{
          method: modalMethod,
        }}
        permissions={permList}
        editGroup={editGroup || null}
        show={groupModal}
        onHide={() => showGroupModal(false)}
        onSave={() => null}
      />
    </Fragment>
  );
};

export default GroupSection;
