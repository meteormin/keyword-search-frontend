import { Group } from './group';

export interface User {
  id: number;
  loginId: string;
  name: string;
  userType: string;
  email: string | null;
  gender: string | null;
  age: string | null;
  createdAt: string | null;
  updatedAt: string | null;
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
  id?: number | null;
  name: string;
  gender: string | null;
  age: string | null;
}
