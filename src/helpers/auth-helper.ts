import { ISerializedUser } from '../types/app-types';
import { UserEntity } from '../users/entity/user.entity';
import { hash, compare } from 'bcrypt';

const serializeUser = (user: UserEntity): ISerializedUser => {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const { password, ...serializedUser } = user;
  return serializedUser;
};

const serializeManyUser = (users: UserEntity[]): ISerializedUser[] => {
  const serializedUsers: ISerializedUser[] = users.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...serializedUser } = user;
    return serializedUser;
  });

  return serializedUsers;
};

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

export const authHelper = {
  serializeUser,
  hashPassword,
  verifyPassword,
  serializeManyUser,
};
