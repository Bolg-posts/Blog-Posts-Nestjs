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
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { postWithDtoCreate, postWithDtoUpdate } from './postWithDto';
import { AuthGuard } from '../user/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() post: postWithDtoCreate, @Req() request) {
    const req = request.user;
    return this.postsService.create(post, req);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: postWithDtoUpdate,
    @Req() request,
  ) {
    console.log(id, updatePostDto);
    return this.postsService.update(id, updatePostDto, request.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  //@Roles(Role.User)
  remove(@Param('id') id: string, @Req() request) {
    return this.postsService.remove(id, request.user);
  }
}
