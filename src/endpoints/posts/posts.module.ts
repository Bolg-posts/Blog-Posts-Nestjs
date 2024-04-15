import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postsSchema } from './postsSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'posts', schema: postsSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
