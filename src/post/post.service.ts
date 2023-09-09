import { Injectable } from '@nestjs/common';
import { PostEntity } from './entity/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { Return } from '../utils/return-function';
import { IReturnObject } from '../types/return-object.type';
import { PostQueryDto } from './dto/searchandPaginagtionParams';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createPost(data: Partial<PostEntity>): Promise<IReturnObject> {
    try {
      const { id, created_at, updated_at, ...rests } = data;

      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['posts'],
      });
      if (!user) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'User not found',
        });
      }

      const createPost = this.postRepository.create({
        ...rests,
        author: user,
      });

      const createdPost = await this.postRepository.save(createPost);
      const { author, ...rest } = createdPost;
      return Return({
        error: false,
        statusCode: 201,
        successMessage: 'created successfully...',
        data: rest,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async updatePost(
    data: Partial<PostEntity>,
    id: string,
    userId: string,
  ): Promise<IReturnObject> {
    try {
      const { created_at, updated_at, ...rest } = data;

      if (!id) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Id must be included',
        });
      }

      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['author'],
      });

      if (!post) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Post not found',
        });
      }

      if (!post.author || post.author.id !== userId) {
        return Return({
          error: true,
          statusCode: 401,
          errorMessage: 'Unauthorized to update this post.',
        });
      }

      const updatedPost = await this.postRepository.update({ id }, rest);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'updated successfully...',
        data: updatedPost.raw[0],
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async getAllPosts(queryParams: PostQueryDto): Promise<IReturnObject> {
    try {
      const { page, pageSize } = queryParams;

      const skip = (Number(page) || 1 - 1) * Number(pageSize) || 5;
      const take = Number(pageSize) || 5;

      let postsQuery = this.postRepository
        .createQueryBuilder('post')
        .skip(skip)
        .take(take)
        .orderBy('post.created_at', 'DESC');

      if (queryParams.search) {
        postsQuery = postsQuery.where(
          'post.title LIKE :query OR post.content LIKE :query',
          { query: `%${queryParams.search}%` },
        );
      }

      const [posts, totalCount] = await postsQuery.getManyAndCount();

      if (posts.length === 0) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'No posts found.',
          data: {
            currentPage: page,
            totalPosts: totalCount,
            pageSize: take,
            totalPages: Math.ceil(totalCount / take),
            posts: [],
          },
        });
      } else {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Posts found.',
          data: {
            currentPage: page,
            totalPosts: totalCount,
            pageSize: take,
            totalPages: Math.ceil(totalCount / take),
            posts,
          },
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async getSinglePosts(id: string): Promise<IReturnObject> {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
      });

      if (!post) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Post not found',
        });
      }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'updated successfully...',
        data: post,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async deletePost(id: string, userId: string): Promise<IReturnObject> {
    try {
      if (!id) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Id must be included',
        });
      }

      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['author'],
      });
      if (!post) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Post not found',
        });
      }
      if (!post.author || post.author.id !== userId) {
        return Return({
          error: true,
          statusCode: 401,
          errorMessage: 'Unauthorized to delete this post.',
        });
      }
      await this.postRepository.remove(post);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'post deleted successfully...',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }
}
