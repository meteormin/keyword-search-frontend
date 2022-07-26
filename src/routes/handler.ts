import { auth } from '../helpers';
import { TokenInfo } from '../utils/auth';
import { UserType } from '../config/UserType';
import { Menu } from '../components/layouts/Navigator';
import { NavItemProps } from '../components/layouts/NavItem';
import { NavCollapsedProps } from '../components/layouts/NavCollapsed';

export const handlePerm = (menuPerm: string[]) => {
  const token = auth.getToken();
  if (token) {
    const tokenInfo: TokenInfo | null = auth.tokenInfo(token);
    if (tokenInfo) {
      const permission = tokenInfo.userType || auth.user()?.userType || '';

      return !menuPerm.includes(permission);
    }
  }

  return true;
};

export const redirectHomePath: {
  [key: string]: { role: string; home: string }[];
} = {
  '152': [
    { role: UserType.ADMIN, home: '/users' },
    { role: UserType.WORKER, home: '/tasks' },
    { role: UserType.REVIEWER1, home: '/reviews/1/assign' },
    { role: UserType.REVIEWER2, home: '/reviews/2/assign' },
    { role: UserType.SCORE, home: '/' },
    { role: UserType.SCORE_REVIEWER, home: '/' },
  ],
  '153': [],
};

export const handleGoHome = (key: string) => {
  return redirectHomePath[key];
};

const menuPerm: {
  [key: string]: { path: string; role: string[] }[];
} = {
  '152': [
    {
      path: '/users',
      role: [UserType.ADMIN],
    },
    {
      path: '/sentences',
      role: [UserType.WORKER, UserType.ADMIN],
    },
    {
      path: '/tasks',
      role: [UserType.WORKER, UserType.ADMIN],
    },
    {
      path: '/reviews/1',
      role: [UserType.REVIEWER1, UserType.ADMIN],
    },
    {
      path: '/reviews/2',
      role: [UserType.REVIEWER2, UserType.ADMIN],
    },
    {
      path: '/reviews/1/assign',
      role: [UserType.REVIEWER1, UserType.ADMIN],
    },
    {
      path: '/reviews/2/assign',
      role: [UserType.REVIEWER2, UserType.ADMIN],
    },
    {
      path: '/questions',
      role: [
        UserType.WORKER,
        UserType.REVIEWER2,
        UserType.REVIEWER1,
        UserType.ADMIN,
      ],
    },
    {
      path: '/statistics',
      role: [UserType.ADMIN],
    },
    {
      path: '/statistics/creator',
      role: [UserType.ADMIN],
    },
    {
      path: '/statistics/review/1',
      role: [UserType.ADMIN],
    },
    {
      path: '/statistics/review/2',
      role: [UserType.ADMIN],
    },
  ],
  '153': [],
};

const getPathRole = (key: string, path: string) => {
  return menuPerm[key].filter((item) => {
    return item.path == path;
  })[0];
};

export const handleMenuVisible = (key: string, menu: Menu): Menu => {
  const userType = auth.user()?.userType as UserType;
  console.log(key);
  menu.navItems = menu.navItems.map(
    (
      item: NavItemProps | NavCollapsedProps,
    ): NavItemProps | NavCollapsedProps => {
      if ('url' in item) {
        const perm = getPathRole(key, item.url);
        item.disabled = !perm?.role?.includes(userType);
        return item;
      } else if ('items' in item) {
        item.items = item.items.map((value) => {
          const perm = getPathRole(key, value.url);
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
