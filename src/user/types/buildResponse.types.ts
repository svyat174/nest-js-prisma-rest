import { UserTypes } from './user.types';

export interface UserResponseInterface {
  users: UserTypes & { token: string };
}
