import { User } from './user';

export interface Group {
  id: number;
  code: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  users?: User[];
}

export interface PostGroup {
  code: string;
  name: string;
}

export interface PatchGroup {
  id: number;
  name: string;
}
