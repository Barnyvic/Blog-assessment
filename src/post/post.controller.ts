import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/createPost.dto';
import { EditPostDto } from './dto/editpost.dto';
import { Response } from 'express';
import { PostQueryDto } from './dto/searchandPaginagtionParams';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post')
  @UseGuards(AuthGuard())
  async CreatePost(
    @Body() body: CreatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const id = req['user'];
    const result = await this.postService.createPost({
      id,
      ...body,
    });
    res.status(result.statusCode).send(result);
  }

  @Put('edit-post/:id')
  @UseGuards(AuthGuard())
  async EditPost(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: EditPostDto,
    @Req() req: Request,
  ) {
    const userId = req['user'];
    const result = await this.postService.updatePost(body, id, userId);
    res.status(result.statusCode).send(result);
  }

  @Delete('delete-post/:id')
  @UseGuards(AuthGuard())
  async DeletePost(
    @Res() res: Response,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const userId = req['user'];
    const result = await this.postService.deletePost(id, userId);
    res.status(result.statusCode).send(result);
  }

  @Get('all-posts')
  @UseGuards(AuthGuard())
  async getAllPost(@Res() res: Response, @Query() query: PostQueryDto) {
    const result = await this.postService.getAllPosts(query);
    res.status(result.statusCode).send(result);
  }

  @Get('all-posts/:id')
  @UseGuards(AuthGuard())
  async GetSinglePost(@Res() res: Response, @Param('id') id: string) {
    const result = await this.postService.getSinglePosts(id);
    res.status(result.statusCode).send(result);
  }
}
