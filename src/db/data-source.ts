import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from '../users/entity/user.entity';
import { PostEntity } from '../post/entity/post.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT')) || 5432,
  username: configService.get('DB_USER'),
  url: configService.get('DB_URL'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UserEntity, PostEntity],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
