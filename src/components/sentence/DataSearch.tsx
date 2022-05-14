import React, { Fragment, useState } from 'react';
import { Button, Col } from 'react-bootstrap';

export interface DataSearchProps {
  search: () => any;
  reset: () => any;
}

const DataSearch = ({ search, reset }: DataSearchProps) => {
  return (
    <Fragment>
      <Col md={4}>
        <Button
          variant="dark"
          style={{ height: '80%', width: '50%' }}
          onClick={search}
        >
          할당내 검색
        </Button>
        <Button
          variant="light"
          className="border"
          style={{ height: '80%', width: '50%' }}
          onClick={reset}
        >
          초기화
        </Button>
      </Col>
      <Col md={4} className="ms-4"></Col>
    </Fragment>
  );
};

export default DataSearch;
