import GroupList, { GroupInfo } from '../../components/users/GroupList';
import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import GroupForm from '../../components/users/GroupForm';
import { Method } from '../../components/users/formTypes';
import { Button, Col, Row } from 'react-bootstrap';

const GroupSection = () => {
  const dispatch = useDispatch();

  const { permList, groups, editGroup } = useSelector(
    usersModule.getUsersState,
  );

  const [groupModal, showGroupModal] = useState(false);
  const [modalMethod, setModalMethod] = useState<Method>(Method.CREATE);

  const getGroupList = () => {
    dispatch(usersModule.actions.getGroups());
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
    dispatch(usersModule.actions.getGroup(id));
  };
  const getPermList = () => {
    dispatch(usersModule.actions.getPermList());
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
            dispatch(usersModule.actions.getEditGroup(group.id));
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
      <Row className="g-2">
        <Col lg={9}>
          <Row>
            <Col sm={6}>
              <label
                htmlFor="group_name"
                className="col-form-label"
                style={{ fontSize: '1rem' }}
              >
                <strong>사용자 그룹</strong>
              </label>
            </Col>
            <Col sm={6}></Col>
          </Row>
        </Col>
        <Col lg={3}>
          <Button variant="dark" className="float-end" onClick={createGroup}>
            생성
          </Button>
        </Col>
      </Row>
      <Row className="mt-4" style={{ height: '90vh', overflowY: 'scroll' }}>
        <GroupList
          groups={groupInfo()}
          onClick={(group: GroupInfo) => {
            getGroup(group.id);
          }}
        />
      </Row>
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
