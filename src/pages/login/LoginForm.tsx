import React from 'react';
import Loading from '../../components/Loading';
import AlertModal from '../../components/AlertModal';
import Container, { ContainerFooter } from '../../components/layouts/Container';
import { Menu } from '../../components/layouts/Navigator';
import { config } from '../../helpers';

export interface LoginFormProps {
  children: React.ReactNode | React.ReactNode[];
}

const LoginForm = ({ children }: LoginFormProps) => {
  const { menu, footer } = config.layouts;

  return (
    <Container menu={menu as Menu} footer={footer as ContainerFooter}>
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-lg-5">{children}</div>
        </div>
      </div>
      <Loading />
      <AlertModal />
    </Container>
  );
};

export default LoginForm;
