import { Menu } from '../components/layouts/Navigator';

export const menu: Menu = {
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
      url: '/scores/assigns',
      name: '문장 평가',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/scores',
      name: '문장 평가 내역',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews/assigns',
      name: '평가 검수',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/reviews',
      name: '평가 검수 내역',
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
      url: '/statistics/scores',
      name: '평가자 통계',
      icon: 'fas fa-file-lines',
    },
    {
      url: '/statistics/review',
      name: '평가 검수자 통계',
      icon: 'fas fa-file-lines',
    },
  ],
};
