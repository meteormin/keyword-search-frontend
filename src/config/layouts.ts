import { menu } from 'config/menu';

const layouts = {
    menu: menu,
    header: {
        dropDownMenu: [
            {
                name: 'Settings',
                url: '#',
            },
            {
                name: 'reset password',
                url: '/password/reset',
            },
        ],
    },
    footer: {
        company: 'miniyus',
        privacyUrl: '#',
        termsUrl: '#',
    },
};

export default layouts;
