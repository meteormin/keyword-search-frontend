import React from 'react';

export interface NavItemProps {
  name: string;
  icon: string;
  url: string;
  active?: boolean;
}

const NavItem = ({ name, icon, url, active }: NavItemProps) => {
  return (
    <a className={`nav-link ${active ? 'active' : ''}`} href={url}>
      <div className="sb-nav-link-icon">
        <i className={icon}></i>
      </div>
      {name}
    </a>
  );
};

export default NavItem;
