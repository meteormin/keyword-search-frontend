import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const NavCollapsed = ({ name, iconClass, items }) => {
  return (
    <Fragment>
      <a
        className="nav-link collapsed"
        href="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseSettings"
        aria-expanded="false"
        aria-controls="collapseSettings"
      >
        <div className="sb-nav-link-icon">
          <i className={iconClass}></i>
        </div>
        {name}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </a>
      <div
        className="collapse"
        id="collapseSettings"
        aria-labelledby="headingOne"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          {items.map((item, key) => (
            <a
              key={'nav_collapse' + key.toString()}
              className="nav-link"
              href={item.url}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </Fragment>
  );
};

NavCollapsed.propTypes = {
  name: propTypes.string,
  iconClass: propTypes.string,
  items: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      url: propTypes.string,
    }),
  ),
};

export default NavCollapsed;
