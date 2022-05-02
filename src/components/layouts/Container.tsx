import React from 'react';
import Navigator, { Menu } from './Navigator';

export interface ContainerProps {
  menu: Menu;
  children: React.ReactNode | React.ReactNode[];
}

const Container = ({ menu, children }: ContainerProps) => {
  return (
    <div id="layoutSidenav">
      <Navigator menu={menu} />
      {children}
    </div>
  );
};

export default Container;
