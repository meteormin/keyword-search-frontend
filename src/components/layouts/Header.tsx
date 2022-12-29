import React, { useEffect, useState } from 'react';
import DropDownMenu, { DropDownMenuProps } from './DropDownMenu';
import { guard } from 'helpers';

export interface HeaderProps {
  appName: string;
  dropDownMenu: DropDownMenuProps[];
  isLogin: boolean;
  userName: string;
}

const Header = ({ appName, dropDownMenu, isLogin, userName }: HeaderProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const userMenu = (isLogin: boolean) => {
    if (isLogin) {
      return <DropDownMenu userName={userName} items={dropDownMenu} />;
    }

    return (
      <a className="nav-link" href="/login" role="button">
        <i className="fas fa-user fa-fw"></i>
        Login
      </a>
    );
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (toggle) {
      body.classList.add('sb-sidenav-toggled');
    } else {
      body.classList.remove('sb-sidenav-toggled');
    }
  }, [toggle]);

  const sidebarToggle = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/*Navbar Brand*/}
      <a className="navbar-brand ps-3" href="/" style={{ fontSize: '0.98em' }}>
        {appName || 'Subject'}
      </a>
      {/*Sidebar Toggle*/}
      <guard.Protected auth={isLogin}>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          // href="#!"
          onClick={sidebarToggle}
        >
          <i className="fas fa-bars"></i>
        </button>
      </guard.Protected>
      {/*Navbar DataSearch*/}
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group"></div>
      </form>
      {/*Navbar*/}
      {userMenu(isLogin)}
    </nav>
  );
};

export default Header;
