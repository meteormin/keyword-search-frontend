import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import Select, { Option } from '../common/Select';
import { UserInfo } from './UserList';
import { user } from '../../utils/auth';
import { useSelector } from 'react-redux';
import usersModule from '../../store/features/users';

export interface FormInfo {
  method: 'create' | 'edit';
  userTypes: Option[];
}

const CreateUserForm = ({
  formInfo,
  show,
  onHide,
  onSave,
  onResetPass,
  onDelete,
}: {
  formInfo: FormInfo;
  show: boolean;
  onHide: () => any;
  onSave: () => any;
  onResetPass?: () => any;
  onDelete?: () => any;
}) => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [userType, setUserType] = useState<string>();
  const { editUser } = useSelector(usersModule.getUsersState);

  useEffect(() => {
    if (editUser) {
      setId(editUser.id);
      setName(editUser.name);
      setUserType(editUser.userType);
    }
  }, [editUser]);
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
              <button
                type="button"
                className="btn btn-dark mx-4"
                onClick={onResetPass}
              >
                암호 초기화
              </button>
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
        value={id}
        readonly={formInfo.method == 'edit'}
      />
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'이름'}
          name={'name'}
          value={name}
        />
      </div>
      <div className="mt-3">
        <Select
          id={'permission'}
          label={'사용자 권한'}
          name={'permission'}
          selectedValue={0}
          options={formInfo.userTypes}
        />
      </div>
      <br />
      {makeButton()}
    </FormModal>
  );
};

export default CreateUserForm;
