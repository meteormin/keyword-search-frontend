import React from 'react';
import propTypes from 'prop-types';

const NavItem = ({ name, icon, url }) => {
  return (
    <a className="nav-link" href={url}>
      <div className="sb-nav-link-icon">
        <i className={icon}></i>
      </div>
      {name}
    </a>
  );
};

NavItem.propTypes = {
  url: propTypes.string,
  name: propTypes.string,
  icon: propTypes.string,
};

export default NavItem;
