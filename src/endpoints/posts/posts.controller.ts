import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { postWithDtoCreate, postWithDtoUpdate } from './postWithDto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() post: postWithDtoCreate) {
    return this.postsService.create(post);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: postWithDtoUpdate) {
    console.log(id, updatePostDto);
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
