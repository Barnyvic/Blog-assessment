import { PostEntity } from 'src/post/entity/post.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Role } from '../eum/user-role.enum';
import { BaseEntity } from '../../helpers/db-helper';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ enum: Role, default: Role.USER, type: 'enum' })
  role: Role;

  @OneToMany(() => PostEntity, (posts) => posts.author, {
    cascade: true,
  })
  posts: PostEntity[];
}
