import React, { Fragment } from 'react';

export interface NavCollapsedProps {
  name: string;
  icon: string;
  items: {
    name: string;
    url: string;
    disabled?: boolean;
  }[];
}

const NavCollapsed = ({ name, icon, items }: NavCollapsedProps) => {
  const activeUrl = (url: string) => {
    const realUrl = new URL(location.href);

    return realUrl.pathname == url;
  };

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
          <i className={icon}></i>
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
          {items.map((item, key) =>
            !item.disabled ? (
              <a
                key={'nav_collapse' + key.toString()}
                className={`nav-link ${activeUrl(item.url) ? 'active' : ''}`}
                href={item.url}
              >
                {item.name}
              </a>
            ) : null,
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export default NavCollapsed;
