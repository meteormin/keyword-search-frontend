import GroupList, { GroupInfo } from '../../components/users/GroupList';
import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import GroupForm from '../../components/users/GroupForm';
import { Method } from '../../components/users/formTypes';
import { Col, Row } from 'react-bootstrap';
import alertModal from '../../store/features/common/alertModal';

const GroupSection = () => {
  const dispatch = useDispatch();

  const { groups, editGroup } = useSelector(usersModule.getUsersState);

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
      const button =
        group.id != 1
          ? makeModifyButton(() => {
              if (group.id) {
                dispatch(usersModule.actions.getEditGroup(group.id));
                updateGroup();
              }
            })
          : null;

      const groupInfo: GroupInfo = {
        no: index + 1,
        id: group.id || 0,
        groupCode: group.code || '',
        groupName: group.name || '',
        operation: button,
      };

      return groupInfo;
    });
  };

  useEffect(() => {
    getGroupList();
  }, []);

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
          {/*<Button variant="dark" className="float-end" onClick={createGroup}>*/}
          {/*  생성*/}
          {/*</Button>*/}
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
        }}
        editGroup={editGroup || null}
        show={groupModal}
        onHide={() => showGroupModal(false)}
        onSave={() => dispatch(usersModule.actions.getGroups())}
      />
    </Fragment>
  );
};

export default GroupSection;
