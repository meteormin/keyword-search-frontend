import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import PermList, { Permission } from './PermList';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { Group } from '../../store/features/users/usersAction';
import { Method } from './formTypes';
import { Button, Col, Row } from 'react-bootstrap';

export interface FormInfo {
  method: Method;
  permissions: Permission[];
}

const GroupForm = ({
  formInfo,
  editGroup,
  show,
  onHide,
  onSave,
  onDelete,
}: {
  formInfo: FormInfo;
  editGroup: Group | null;
  show: boolean;
  onHide: () => any;
  onSave: () => any;
  onDelete?: () => any;
}) => {
  const dispatch = useDispatch();
  const { createGroup } = useSelector(usersModule.getUsersState);
  const [_editGroup, setEditGroup] = useState<Group | null>(editGroup);
  const [permList, setPermList] = useState<number[]>([]);
  const [groupName, setGroupName] = useState<string>(editGroup?.name || '');

  useEffect(() => {
    console.log('edit:', editGroup);
    if (show && formInfo.method == Method.UPDATE) {
      if (editGroup?.edges?.permissions) {
        setPermList(
          editGroup?.edges?.permissions.map((permission): number => {
            return permission.id;
          }),
        );
      }
      setEditGroup(editGroup);
      setGroupName(editGroup?.name || '');
    } else {
      setGroupName('');
      setEditGroup(null);
      setPermList([]);
    }
  }, [editGroup, _editGroup, show]);

  const changePermCheck = (values: number[]) => {
    setPermList(values);
    console.log(permList);
  };

  const saveGroupPermission = (id: number) => {
    dispatch(usersModule.setGroupPermission({ id: id, permissions: permList }));
  };

  const makeButton = () => {
    switch (formInfo.method) {
      case Method.CREATE:
        return (
          <Row className="justify-content-end">
            <Col md={4} className="offset-4">
              <Button variant="dark" className="float-end" onClick={onSave}>
                저장
              </Button>
            </Col>
          </Row>
        );
      case Method.UPDATE:
        return (
          <Row className="justify-content-end">
            <Col sm={4}>
              <Button variant="dark" className="ms-0" onClick={onSave}>
                수정
              </Button>
              <Button variant="dark" className="float-end" onClick={onDelete}>
                삭제
              </Button>
            </Col>
          </Row>
        );
    }
  };
  return (
    <FormModal show={show} onHide={onHide}>
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'그룹명'}
          name={'name'}
          value={groupName}
        />
      </div>
      <div className="mt-3">
        <div className="col-lg-7">
          <label htmlFor="" className="col-form-label">
            <strong>권한 선택</strong>
          </label>
        </div>
        <PermList
          permissions={formInfo.permissions}
          activeValues={permList}
          onChange={changePermCheck}
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default GroupForm;
