import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from '../users/entity/user.entity';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
