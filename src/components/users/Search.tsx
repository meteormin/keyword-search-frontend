import React, { useState } from 'react';
import Select from '../common/Select';
import { config } from '../../helpers';

export interface SearchProps {
  id: string | number;
  name: string;
  permission: string | number;
  onSubmit: (
    id: string | number,
    name: string,
    permission: number | string,
  ) => void;
}

const Search = ({ id, name, permission, onSubmit }: SearchProps) => {
  const [_id, setId] = useState<string | number>(id);
  const [_name, setName] = useState<string>(name);
  const [_permission, setPermission] = useState<string | number>(permission);
  const permissionOptions = [{ name: '권한을 선택해주세요', value: '' }].concat(
    config.auth.userTypes,
  );

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setter(e.target.value);
  };

  const onClickButton = () => {
    onSubmit(id, name, permission);
  };

  return (
    <div id="search" className="row justify-content-end">
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        아이디
      </label>
      <div className="col-sm-auto">
        <input
          className="form-control"
          id="userId"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={_id}
          onChange={(e) => onChangeInput(e, setId)}
        />
      </div>
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        이름
      </label>
      <div className="col-sm-auto">
        <input
          className="form-control"
          id="userId"
          type="text"
          placeholder="이름을 입력해 주세요."
          value={_name}
          onChange={(e) => onChangeInput(e, setName)}
        />
      </div>
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        권한
      </label>
      <div className="col-sm-auto">
        <Select
          id="permission"
          name="permission"
          options={permissionOptions}
          onChange={(e) => {
            setPermission(e.target.options[e.target.selectedIndex].value);
          }}
        />
      </div>
      <div className="col-sm-auto">
        <button type="button" className="btn btn-dark" onClick={onClickButton}>
          검색
        </button>
      </div>
    </div>
  );
};

export default Search;
