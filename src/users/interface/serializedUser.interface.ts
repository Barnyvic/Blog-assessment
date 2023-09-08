import { PostEntity } from 'src/post/entity/post.entity';
import { Role } from '../eum/user-role.enum';

export interface ISerializedUsers {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  posts: PostEntity[];
  id: string;
  created_at: string;
  updated_at: string;
}
