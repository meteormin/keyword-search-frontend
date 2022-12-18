import React from 'react';
import { NavItemProps } from 'components/layouts/NavItem';
import { guard, auth } from 'helpers';
import { Nav } from 'react-bootstrap';

export interface Menu {
  header: string;
  url: string;
  name: string;
  navItems: NavItemProps[];
}

const NavTabs = ({ menu }: { menu: Menu }) => {
  const handleGuard = () => {
    if (auth.isLogin()) {
      return false;
    }

    return !auth.isLogin();
  };

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/">
        {menu.navItems.map((item, key) => {
          return (
            <guard.HiddenByRole
              key={'guard_' + key.toString()}
              handleCondition={handleGuard}
            >
              <Nav.Item>
                <Nav.Link href={item.url} className="text-secondary">
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            </guard.HiddenByRole>
          );
        })}
      </Nav>
    </div>
  );
};

export default NavTabs;
