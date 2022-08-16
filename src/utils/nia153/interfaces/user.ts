import { Group } from './group';

export interface User {
  id: string;
  loginId: string;
  name: string;
  userType: string;
  email: string;
  gender: string | null;
  age: string | null;
  createdAt: string;
  updatedAt: string;
  group?: Group;
}

export interface PostUser {
  loginId: string;
  name: string;
  userType: string;
  email: string | null;
  gender: string | null;
  age: string | null;
  groupId: number;
}

export interface PatchUser {
  name: string;
  gender: string | null;
  age: string | null;
}
