import React, { useState } from 'react';

const Search = ({
  onSubmit,
}: {
  onSubmit: (
    id: string | number,
    name: string,
    permission: number | string,
  ) => void;
}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };

  const onClickButton = () => {
    onSubmit(id, name, permission);
  };

  return (
    <div id="search" className="row justify-content-center">
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        아이디
      </label>
      <div className="col-sm-auto">
        <input
          className="form-control"
          id="userId"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={id}
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
          value={name}
          onChange={(e) => onChangeInput(e, setName)}
        />
      </div>
      <label htmlFor="userId" className="col-sm-auto col-form-label">
        권한
      </label>
      <div className="col-sm-auto">
        <input
          className="form-control"
          id="userId"
          type="text"
          placeholder="권한를 입력해 주세요."
          value={permission}
          onChange={(e) => onChangeInput(e, setPermission)}
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
