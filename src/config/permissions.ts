export interface Permission {
  name: string;
  value: number | string;
}

const permissions: { [key: string]: Permission[] } = {
  default: [
    {
      name: 'permission 1',
      value: 1,
    },
  ],
};

export default permissions;
