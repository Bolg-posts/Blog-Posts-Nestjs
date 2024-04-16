import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './userSchema';
import { JwtModule } from '@nestjs/jwt';
import { postsSchema } from '../posts/postsSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: userSchema },
      { name: 'Posts', schema: postsSchema },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
