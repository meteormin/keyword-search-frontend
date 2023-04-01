import React from 'react';

export interface DropDownMenuProps {
    name: string;
    url: string;
}

const DropDownMenu = ({
    userName,
    items,
}: {
    userName: string;
    items: DropDownMenuProps[];
}) => {
    const dropDownItem = (key: number, name: string, url: string) => (
        <li key={'dropdown_key' + key.toString()}>
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
                    {userName}
                    <i className="fas fa-user fa-fw"></i>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                >
                    {items.map((item, key) =>
                        dropDownItem(key, item.name, item.url),
                    )}
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

export default DropDownMenu;
