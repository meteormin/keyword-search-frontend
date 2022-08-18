import { auth } from '../helpers';
import { TokenInfo } from '../utils/auth';
import { UserType } from '../config/UserType';
import { Menu } from '../components/layouts/Navigator';
import { NavItemProps } from '../components/layouts/NavItem';
import { NavCollapsedProps } from '../components/layouts/NavCollapsed';

export const handlePerm = (menuPerm: string[]) => {
  const token = auth.getToken();

  if (token) {
    const tokenInfo: TokenInfo | null = auth.tokenInfo(token.accessToken);

    if (tokenInfo) {
      const permission = tokenInfo.userType || auth.user()?.userType || '';

      return !menuPerm.includes(permission);
    }
  }

  return true;
};

export const redirectHomePath: { role: string; home: string }[] = [
  { role: UserType.ADMIN, home: '/users' },
  { role: UserType.SCORE, home: '/scores/assigns' },
  { role: UserType.SCORE_REVIEWER, home: '/reviews/assigns' },
];

export const handleGoHome = () => {
  return redirectHomePath;
};

const menuPerm: { path: string; role: string[] }[] = [
  {
    path: '/users',
    role: [UserType.ADMIN],
  },
  {
    path: '/scores/assigns',
    role: [UserType.SCORE, UserType.ADMIN],
  },
  {
    path: '/scores',
    role: [UserType.SCORE, UserType.ADMIN],
  },
  {
    path: '/reviews',
    role: [UserType.SCORE_REVIEWER, UserType.ADMIN],
  },
  {
    path: '/reviews/assigns',
    role: [UserType.SCORE_REVIEWER, UserType.ADMIN],
  },
  {
    path: '/questions',
    role: [UserType.ADMIN, UserType.SCORE_REVIEWER, UserType.SCORE],
  },
  {
    path: '/statistics',
    role: [UserType.ADMIN],
  },
  {
    path: '/statistics/score',
    role: [UserType.ADMIN],
  },
  {
    path: '/statistics/review',
    role: [UserType.ADMIN],
  },
];

const getPathRole = (path: string) => {
  return menuPerm.filter((item) => {
    return item.path == path;
  })[0];
};

export const handleMenuVisible = (menu: Menu): Menu => {
  const userType = auth.user()?.userType as UserType;
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
