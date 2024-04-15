import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './endpoints/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './endpoints/posts/posts.module';

@Module({
  imports: [
    UserModule,
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/UI'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
