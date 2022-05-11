import React from 'react';
import FormModal from './FormModal';
import Input from '../common/Input';
import Select, { Option } from '../common/Select';

export interface formInfo {
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
  formInfo: formInfo;
  show: boolean;
  onHide: () => any;
  onSave: () => any;
  onResetPass: () => any;
  onDelete?: () => any;
}) => {
  const makeButton = () => {
    switch (formInfo.method) {
      case 'create':
        return (
          <div className="row justify-content-end">
            <div className="col-3 offset-10">
              <button type="button" className="btn btn-dark" onClick={onSave}>
                저장
              </button>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="row justify-content-end">
            <div className="col-sm-4 offset-4">
              <button
                type="button"
                className="btn btn-dark"
                onClick={onResetPass}
              >
                암호 초기화
              </button>
              <button type="button" className="btn btn-dark" onClick={onSave}>
                수정
              </button>
              <button type="button" className="btn btn-dark" onClick={onDelete}>
                삭제
              </button>
            </div>
          </div>
        );
    }
  };
  return (
    <FormModal show={show} onHide={onHide}>
      <Input type={'text'} id={'id'} label={'아이디'} name={'id'} value={''} />
      <div className="mt-3">
        <Input
          type={'text'}
          id={'name'}
          label={'이름'}
          name={'name'}
          value={''}
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
