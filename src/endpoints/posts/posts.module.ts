import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postsSchema } from './postsSchema';
import { JwtModule } from '@nestjs/jwt';
import { userSchema } from '../user/userSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'posts', schema: postsSchema },
      { name: 'user', schema: userSchema },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
