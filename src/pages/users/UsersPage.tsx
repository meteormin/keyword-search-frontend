import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import Search from '../../components/users/Search';
import GroupSection from './GroupSection';
import UserSection from './UserSection';
import usersModule from '../../store/features/users';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

export interface SearchState {
  id: string | number;
  name: string;
  permission: string | number;
}

const UsersPage = () => {
  const dispatch = useDispatch();
  const { search } = useSelector(usersModule.getUsersState);

  return (
    <Container>
      <Row className="mx-1">
        <Col lg={12} className="mt-4 ms-4">
          <Search
            {...search}
            onSubmit={(id, name, permission) => {
              console.log(id, name, permission);
              dispatch(
                usersModule.searchUser({
                  id: id as string,
                  name: name,
                  permission: permission as string,
                }),
              );
            }}
          />
        </Col>
        <Row className="mt-4">
          <hr />
        </Row>
        <Col lg={4} className="mt-4 me-2">
          <GroupSection />
        </Col>
        <Col lg={7} className="mt-4 ms-4">
          <UserSection />
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
