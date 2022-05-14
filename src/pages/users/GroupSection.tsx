import GroupList, { GroupInfo } from '../../components/users/GroupList';
import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import GroupForm from '../../components/users/GroupForm';
import { Method } from '../../components/users/formTypes';

const GroupSection = () => {
  const dispatch = useDispatch();

  const { permList, groups, editGroup } = useSelector(
    usersModule.getUsersState,
  );

  const [groupModal, showGroupModal] = useState(false);
  const [modalMethod, setModalMethod] = useState<Method>(Method.CREATE);

  const getGroupList = () => {
    dispatch(usersModule.getGroups());
  };
  const createGroup = () => {
    showGroupModal(true);
    setModalMethod(Method.CREATE);
  };
  const updateGroup = () => {
    showGroupModal(true);
    setModalMethod(Method.UPDATE);
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
            updateGroup();
          }
        }),
      };

      return groupInfo;
    });
  };

  useEffect(() => {
    getGroupList();
    getPermList();
  }, []);

  useEffect(() => {
    console.log('change edit group');
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
            <div className="col-sm-6"></div>
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
      <GroupForm
        formInfo={{
          method: modalMethod,
          permissions: permList,
        }}
        editGroup={editGroup || null}
        show={groupModal}
        onHide={() => showGroupModal(false)}
        onSave={() => null}
      />
    </Fragment>
  );
};

export default GroupSection;
