import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { authHelper } from 'src/helpers/auth-helper';
import { ISerializedUsers } from './interface/serializedUser.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    if (!email) return undefined;
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    if (!id) return undefined;
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<ISerializedUsers[]> {
    const users = await this.userRepository.find();
    return await authHelper.serializeManyUser(users);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
