import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import PermList, { Permission } from './PermList';
import { useDispatch, useSelector } from 'react-redux';
import usersModule from '../../store/features/users';
import { Group } from '../../store/features/users/usersAction';

export interface FormInfo {
  method: 'create' | 'edit';
}

const CreateGroupForm = ({
  formInfo,
  permissions,
  editGroup,
  show,
  onHide,
  onSave,
  onDelete,
}: {
  formInfo: FormInfo;
  permissions: Permission[];
  editGroup: Group | null;
  show: boolean;
  onHide: () => any;
  onSave: () => any;
  onDelete?: () => any;
}) => {
  const dispatch = useDispatch();
  const { createGroup } = useSelector(usersModule.getUsersState);

  const [permList, setPermList] = useState<number[]>([]);
  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    console.log('edit:', editGroup);
    if (editGroup?.edges?.permissions) {
      setPermList(
        editGroup?.edges?.permissions.map((permission): number => {
          return permission.id;
        }),
      );
    }
    setGroupName(editGroup?.name || '');
  }, [editGroup]);

  const changePermCheck = (values: number[]) => {
    setPermList(values);
    console.log(permList);
  };

  const saveGroupPermission = (id: number) => {
    dispatch(usersModule.setGroupPermission({ id: id, permissions: permList }));
  };

  const makeButton = () => {
    switch (formInfo.method) {
      case 'create':
        return (
          <div className="row justify-content-end">
            <div className="col-4 offset-4">
              <button
                type="button"
                className="btn btn-dark float-end"
                onClick={onSave}
              >
                저장
              </button>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="row justify-content-end">
            <div className="col-sm-8 offset-8">
              <button type="button" className="btn btn-dark" onClick={onSave}>
                수정
              </button>
              <button
                type="button"
                className="btn btn-dark float-end"
                onClick={onDelete}
              >
                삭제
              </button>
            </div>
          </div>
        );
    }
  };
  return (
    <FormModal show={show} onHide={onHide}>
      <Input
        type={'text'}
        id={'id'}
        label={'아이디'}
        name={'id'}
        value={editGroup?.id || ''}
        readonly={true}
      />
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
          permissions={permissions}
          activeValues={permList}
          onChange={changePermCheck}
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default CreateGroupForm;
