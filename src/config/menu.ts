import { Menu } from '../components/layouts/Navigator';

const menu: Menu = {
  header: '',
  url: '/',
  name: '',
  icon: '',
  navItems: [
    {
      url: '/users',
      name: '사용자 관리',
      icon: 'fas fa-users',
    },
    {
      url: '/tasks',
      name: '문장 생성',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/sentences',
      name: '문장 생성 내역',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/1/assign',
      name: '문장 검수 1',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/1',
      name: '문장 검수 내역 1',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/2/assign',
      name: '문장 검수 2',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/2',
      name: '문장 검수 내역 2',
      icon: 'fas fa-file-lines',
    },
  ],
};

export default menu;
