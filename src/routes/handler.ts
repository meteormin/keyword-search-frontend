import { auth } from 'helpers';
import { TokenInfo } from 'utils/auth';
import { UserRole } from 'config/UserType';
import { Menu } from 'components/layouts/Navigator';
import { NavItemProps } from 'components/layouts/NavItem';
import { NavCollapsedProps } from 'components/layouts/NavCollapsed';

export const handlePerm = (menuPerm: string[]): boolean => {
    const token = auth.getToken();

    if (token) {
        const tokenInfo: TokenInfo | null = auth.tokenInfo(
            token.accessToken.token,
        );

        if (tokenInfo) {
            const permission = auth.user()?.role || '';

            return !menuPerm.includes(permission);
        }
    }

    return true;
};

export const redirectHomePath: { role: string; home: string }[] = [
    { role: UserRole.ADMIN, home: '/hosts' },
];

export const handleGoHome = () => {
    return redirectHomePath;
};

const menuPerm: { path: string; role: string[] }[] = [
    {
        path: '/',
        role: [UserRole.ADMIN],
    },
    {
        path: '/hosts',
        role: [UserRole.ADMIN],
    },
    {
        path: '/search',
        role: [UserRole.ADMIN],
    },
];

const getPathRole = (path: string) => {
    return menuPerm.filter((item) => {
        return item.path == path;
    })[0];
};

export const handleMenuVisible = (menu: Menu): Menu => {
    const userType = auth.user()?.role as UserRole;
    menu.navItems = menu.navItems.map(
        (
            item: NavItemProps | NavCollapsedProps,
        ): NavItemProps | NavCollapsedProps => {
            if ('url' in item) {
                const perm = getPathRole(item.url);
                item.disabled = !perm?.role?.includes(userType);
                return item;
            } else if ('items' in item) {
                item.items = item.items.map((value) => {
                    const perm = getPathRole(value.url);
                    return {
                        url: value.url,
                        name: value.name,
                        disabled: !perm?.role?.includes(userType),
                    };
                });
                return item;
            } else {
                return item;
            }
        },
    );

    return menu;
};
