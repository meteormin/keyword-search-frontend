import React from 'react';
import Loading from '../common/Loading';
import AlertModal from '../modal/AlertModal';
import Footer from './Footer';
import { guard } from '../../helpers';
import NavTabs, { Menu } from './NavTabs';

export interface ContainerProps {
  isLogin: boolean;
  menu: Menu;
  children: React.ReactNode | React.ReactNode[];
  footer: ContainerFooter;
}

export interface ContainerFooter {
  company: string;
  privacyUrl: string;
  termsUrl: string;
}

const Container = ({ isLogin, menu, footer, children }: ContainerProps) => {
  const year = new Date().getFullYear().toString();
  return (
    <div id="layoutAuthentication">
      <guard.Protected auth={isLogin}>
        <NavTabs menu={menu as Menu} />
      </guard.Protected>
      <div id="layoutAuthentication_content">
        <main>
          {children}
          <Loading />
          <AlertModal />
        </main>
      </div>
      <Footer year={year} {...footer} />
    </div>
  );
};

export default Container;
