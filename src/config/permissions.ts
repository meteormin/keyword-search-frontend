export interface Permission {
  name: string;
  value: number | string;
}

const permissions: { [key: string]: Permission[] } = {
  default: [
    {
      name: '문장 생성',
      value: 1,
    },
    {
      name: '문장 생성 검수',
      value: 2,
    },
    {
      name: '문장 평가',
      value: 3,
    },
    {
      name: '문장 평가 검수',
      value: 4,
    },
    {
      name: '데이터 통계',
      value: 5,
    },
    {
      name: '그룹 관리',
      value: 6,
    },
    {
      name: '사용자 관리',
      value: 7,
    },
    {
      name: '1:1 문의',
      value: 8,
    },
  ],
};

export default permissions;
