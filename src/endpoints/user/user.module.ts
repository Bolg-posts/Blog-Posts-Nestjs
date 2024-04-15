import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './userSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
