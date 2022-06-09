export interface Group {
  id: number;
  code: string;
  name: string;
  edges?: {
    users?: User[];
    permissions?: Permission[];
  };
}

export interface User {
  id: number;
  loginId: string;
  name: string;
  userType: string;
  groupId: number;
  groupCode: string;
  groupName: string;
  createAt: string;
  edges?: object;
}

export interface Permission {
  id: number;
  code: string;
  name: string;
  edges?: object;
}

export interface CreateUser {
  loginId: string;
  name: string;
  userType: string;
  groupId: number;
}

export interface CreateGroup {
  name: string;
  permissions: number[];
}

export interface UpdateGroupPerm {
  id?: number;
  permissions: number[];
}
