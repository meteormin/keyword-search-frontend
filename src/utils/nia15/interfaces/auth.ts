import { User } from '../../auth';

export interface LoginUser extends User {
  id: number;
  loginId: string;
  email: string;
  name: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
}
