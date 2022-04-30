export default {
  header: 'Header',
  url: '/',
  name: 'Menu',
  navItems: [
    {
      url: '/test',
      name: 'Test',
      iconClass: 'fas fa-question-circle',
    },
    {
      url: '/test',
      name: 'Test',
      iconClass: 'fas fa-question-circle',
    },
    {
      name: '열기/닫기',
      iconClass: 'fas fa-question-circle',
      items: [
        {
          url: '#',
          name: '1',
        },
        {
          url: '#',
          name: '2',
        },
      ],
    },
  ],
};
