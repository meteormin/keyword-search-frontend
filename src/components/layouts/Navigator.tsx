import React from 'react';
import NavItem, { NavItemProps } from './NavItem';
import NavCollapsed, { NavCollapsedProps } from './NavCollapsed';
import { guard, auth } from 'helpers';

export interface Menu {
    header: string;
    url: string;
    name: string;
    icon: string;
    navItems: (NavItemProps | NavCollapsedProps)[];
}

const Navigator = ({ menu }: { menu: Menu }) => {
    const isCollapsed = (item: NavCollapsedProps | NavItemProps) => {
        return Object.prototype.hasOwnProperty.call(item, 'items');
    };

    const handleGuard = () => {
        if (auth.isLogin()) {
            return false;
        }

        return !auth.isLogin();
    };

    const activeUrl = (url: string) => {
        const realUrl = new URL(location.href);

        return realUrl.pathname == url;
    };

    return (
        <div id="layoutSidenav_nav">
            <nav
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
            >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">
                            {menu.header}
                        </div>
                        <a className="nav-link" href={menu.url}>
                            <div className="sb-nav-link-icon">
                                <i className={menu.icon}></i>
                            </div>
                            {menu.name}
                        </a>

                        {menu.navItems.map((item, key) => {
                            if (isCollapsed(item)) {
                                return (
                                    <guard.HiddenByRole
                                        key={'guard_' + key.toString()}
                                        handleCondition={handleGuard}
                                    >
                                        <NavCollapsed
                                            key={'nav_item' + key.toString()}
                                            name={item.name}
                                            icon={item.icon}
                                            items={
                                                'items' in item
                                                    ? item.items
                                                    : []
                                            }
                                        />
                                    </guard.HiddenByRole>
                                );
                            }

                            return (
                                <guard.HiddenByRole
                                    key={'guard_' + key.toString()}
                                    handleCondition={handleGuard}
                                >
                                    <NavItem
                                        key={'nav_item' + key.toString()}
                                        name={item.name}
                                        icon={item.icon}
                                        url={'url' in item ? item.url : ''}
                                        active={activeUrl(
                                            'url' in item ? item.url : '',
                                        )}
                                        disabled={
                                            ('disabled' in item &&
                                                item?.disabled) ||
                                            false
                                        }
                                    />
                                </guard.HiddenByRole>
                            );
                        })}
                    </div>
                </div>
                {/*<div className="sb-sidenav-footer">*/}
                {/*  <div className="small">Footer</div>*/}
                {/*  Footer*/}
                {/*</div>*/}
            </nav>
        </div>
    );
};

export default Navigator;
