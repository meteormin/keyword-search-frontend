import React, { Fragment } from 'react';
import Loading from '../common/Loading';
import AlertModal from '../modals/AlertModal';
import { Col, Container, Row } from 'react-bootstrap';

export interface LoginFormProps {
  children: React.ReactNode | React.ReactNode[];
}

const LoginForm = ({ children }: LoginFormProps) => {
  return (
    <Fragment>
      <Container>
        <Row className="justify-content-center">
          <Col lg={5}>{children}</Col>
        </Row>
      </Container>
      <Loading />
      <AlertModal />
    </Fragment>
  );
};

export default LoginForm;
