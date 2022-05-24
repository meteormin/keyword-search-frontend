import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import PermList, { Permission } from './PermList';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { CreateGroup, Group } from '../../store/features/users/userAction';
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
  const { postGroup, currentGroup } = useSelector(usersModule.getUsersState);
  const [_editGroup, setEditGroup] = useState<Group | null>(editGroup);
  const [permList, setPermList] = useState<number[]>([]);
  const [groupName, setGroupName] = useState<string>(editGroup?.name || '');
  const [_show, setShow] = useState<boolean>(show);

  useEffect(() => {
    console.log('edit:', editGroup);
    setShow(show);
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

  const createGroup = (group: CreateGroup) => {
    dispatch(usersModule.actions.saveGroup(group));
  };

  const saveGroupPermission = (id: number) => {
    dispatch(
      usersModule.actions.setGroupPermission({ id: id, permissions: permList }),
    );
  };

  const makeButton = () => {
    switch (formInfo.method) {
      case Method.CREATE:
        return (
          <Row className="justify-content-end">
            <Col md={4} className="offset-4">
              <Button
                variant="dark"
                className="float-end"
                onClick={() => {
                  if (groupName) {
                    createGroup({
                      name: groupName,
                    });
                  }
                  onSave();
                  onHide();
                }}
              >
                저장
              </Button>
            </Col>
          </Row>
        );
      case Method.UPDATE:
        return (
          <Row className="justify-content-end">
            <Col sm={4}>
              <Button
                variant="dark"
                className="ms-0"
                onClick={() => {
                  if (_editGroup) {
                    saveGroupPermission(_editGroup.id);
                  }
                  onSave();
                  onHide();
                }}
              >
                수정
              </Button>
              <Button
                variant="dark"
                className="float-end"
                onClick={() => {
                  onHide();
                  if (onDelete) {
                    onDelete();
                  }
                }}
              >
                삭제
              </Button>
            </Col>
          </Row>
        );
    }
  };
  return (
    <FormModal header={'사용자 그룹 생성'} show={_show} onHide={onHide}>
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'그룹명'}
          name={'name'}
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
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
