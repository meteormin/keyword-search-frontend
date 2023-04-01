import React, { Fragment } from 'react';

export interface NavItemProps {
    name: string;
    icon: string;
    url: string;
    disabled?: boolean;
    active?: boolean;
}

const NavItem = ({ name, icon, url, disabled, active }: NavItemProps) => {
    return (
        <Fragment>
            {!disabled ? (
                <a className={`nav-link ${active ? 'active' : ''}`} href={url}>
                    <div className="sb-nav-link-icon">
                        <i className={icon}></i>
                    </div>
                    {name}
                </a>
            ) : null}
        </Fragment>
    );
};

export default NavItem;
