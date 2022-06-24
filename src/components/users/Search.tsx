import React, { useState } from 'react';
import Select from '../common/Select';
import { config } from '../../helpers';
import { Col, Row } from 'react-bootstrap';

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
    onSubmit(_id, _name, _permission);
  };

  return (
    <Row id="search" className="offset-2">
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        아이디
      </label>
      <Col sm="auto">
        <input
          className="form-control"
          id="userId"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={_id}
          onChange={(e) => onChangeInput(e, setId)}
        />
      </Col>
      <label htmlFor="userName" className="col-sm-auto col-form-label">
        이름
      </label>
      <Col sm="auto">
        <input
          className="form-control"
          id="userName"
          type="text"
          placeholder="이름을 입력해 주세요."
          value={_name}
          onChange={(e) => onChangeInput(e, setName)}
        />
      </Col>
      <label htmlFor="permission" className="col-sm-auto col-form-label">
        권한
      </label>
      <Col sm="auto">
        <Select
          id="permission"
          name="permission"
          options={permissionOptions}
          onChange={(e) => {
            setPermission(e.target.options[e.target.selectedIndex].value);
          }}
        />
      </Col>
      <Col sm="auto">
        <button type="button" className="btn btn-dark" onClick={onClickButton}>
          검색
        </button>
      </Col>
    </Row>
  );
};

export default Search;
