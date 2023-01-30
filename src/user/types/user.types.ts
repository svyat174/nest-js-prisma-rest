import { User } from '@prisma/client';

export type UserTypes = Omit<User, 'password'>;
