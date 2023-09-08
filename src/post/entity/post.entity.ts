import { UserEntity } from 'src/users/entity/user.entity';
import { BaseEntity } from '../../helpers/db-helper';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  author: UserEntity;
}
