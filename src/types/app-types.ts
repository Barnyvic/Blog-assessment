import { UserEntity } from '../users/entity/user.entity';

type ISerializedUser = Omit<UserEntity, 'password'>;

export type { ISerializedUser };
