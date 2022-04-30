import React from 'react';
import propTypes from 'prop-types';

const NavItem = ({ name, iconClass, url }) => {
  return (
    <a className="nav-link" href={url}>
      <div className="sb-nav-link-icon">
        <i className={iconClass}></i>
      </div>
      {name}
    </a>
  );
};

NavItem.propTypes = {
  url: propTypes.string,
  name: propTypes.string,
  iconClass: propTypes.string,
};

export default NavItem;
