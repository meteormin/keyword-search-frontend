import propTypes from 'prop-types';
import React from 'react';

const DropDownMenu = ({ items }) => {
  const dropDownItem = (key, name, url) => (
    <li key={'dropdown_key' + key}>
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
          {items.map((item, key) => dropDownItem(key, item.name, item.url))}
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

export default DropDownMenu;
