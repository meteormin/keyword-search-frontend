import React from 'react';

export interface NavItemProps {
  name: string;
  icon: string;
  url: string;
}

const NavItem = ({ name, icon, url }: NavItemProps) => {
  return (
    <a className="nav-link" href={url}>
      <div className="sb-nav-link-icon">
        <i className={icon}></i>
      </div>
      {name}
    </a>
  );
};

export default NavItem;
