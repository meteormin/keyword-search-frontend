import { Menu } from 'components/layouts/Navigator';

export const menu: Menu = {
    header: '',
    url: '/',
    name: '',
    icon: '',
    navItems: [
        {
            url: '/',
            name: 'Main',
            icon: 'fas fa-users',
        },
        {
            url: '/hosts',
            name: 'Hosts',
            icon: 'fas fa-link',
        },
        {
            url: '/search',
            name: 'Search',
            icon: 'fas fa-magnifying-glass',
        },
    ],
};
