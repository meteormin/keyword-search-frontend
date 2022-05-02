import React from 'react';
import DropDownMenu, { DropDownMenuProps } from './DropDownMenu';

export interface HeaderProps {
  appName: string;
  dropDownMenu: DropDownMenuProps[];
  isLogin: boolean;
}

const Header = ({ appName, dropDownMenu, isLogin }: HeaderProps) => {
  const userMenu = (isLogin: boolean) => {
    if (isLogin) {
      return <DropDownMenu items={dropDownMenu} />;
    }

    return (
      <a className="nav-link" href="/login" role="button">
        <i className="fas fa-user fa-fw"></i>
        Login
      </a>
    );
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/*Navbar Brand*/}
      <a className="navbar-brand ps-3" href="/">
        {appName || 'Subject'}
      </a>
      {/*Sidebar Toggle*/}
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        // href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      {/*Navbar Search*/}
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group"></div>
      </form>
      {/*Navbar*/}
      {userMenu(isLogin)}
    </nav>
  );
};

export default Header;
