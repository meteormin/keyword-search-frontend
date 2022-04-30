import React from 'react';
import propTypes, { bool } from 'prop-types';

const Header = ({ appName, dropDownMenu, isLogin }) => {
  const authCheck = (isLogin) => {
    return isLogin ? (
      <DropDownMenu items={dropDownMenu} />
    ) : (
      <a
        className="nav-link"
        id="navbarDropdown"
        href="/login"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-user fa-fw"></i>
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
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      {/*Navbar Search*/}
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group"></div>
      </form>
      {/*Navbar*/}
      {authCheck(isLogin)}
    </nav>
  );
};

const DropDownMenu = ({ items }) => {
  const dropDownItem = (name, url) => (
    <li>
      <a className="dropdown-item" href={url}>
        {name}
      </a>
    </li>
  );
  return (
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-user fa-fw"></i>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          {items.map((item) => dropDownItem(item.name, item.url))}
          <li>
            <a className="dropdown-item" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

DropDownMenu.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      url: propTypes.string,
    }),
  ),
};

Header.propTypes = {
  appName: propTypes.string,
  dropDownMenu: propTypes.arrayOf(propTypes.shape(DropDownMenu.propTypes)),
  isLogin: bool,
};

export default Header;
