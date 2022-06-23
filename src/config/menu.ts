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
      name: '1차 문장 검수',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/1',
      name: '1차 문장 검수 내역',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/2/assign',
      name: '2차 문장 검수',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/2',
      name: '2차 문장 검수 내역',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/questions',
      name: '문의 답변',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/statistics',
      name: '전체 데이터 목록',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/statistics/creator',
      name: '생성자 통계',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/statistics/review/1',
      name: '검수자 통계',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/statistics/review/2',
      name: '검수 관리자 통계',
      icon: 'fas fa-file-lines',
    },
  ],
};

export default menu;
