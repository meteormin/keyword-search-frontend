import React, { Fragment, useState } from 'react';

export interface DataSearchProps {
  search: () => any;
  reset: () => any;
}

const DataSearch = ({ search, reset }: DataSearchProps) => {
  return (
    <Fragment>
      <div className="col-4">
        <button
          type="button"
          className="btn btn-dark"
          style={{ height: '80%', width: '50%' }}
          onClick={search}
        >
          할당내 검색
        </button>
        <button
          type="button"
          className="btn btn-light border"
          style={{ height: '80%', width: '50%' }}
          onClick={reset}
        >
          초기화
        </button>
      </div>
      <div className="col-4 ms-4"></div>
    </Fragment>
  );
};

export default DataSearch;
