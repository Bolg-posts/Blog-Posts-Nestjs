import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { postWithDtoCreate, postWithDtoUpdate } from './postWithDto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private PostsModel,
    @InjectModel('user') private UsersModel,
  ) {}

  async create(post: postWithDtoCreate, req) {
    console.log(post);
    try {
      const newPost = new this.PostsModel(post);
      await newPost.save();
      await this.UsersModel.updateOne(
        { email: req.email },
        { $push: { posts: newPost } },
      );
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.PostsModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    console.log(id);
    try {
      const searchedPost = await this.PostsModel.findById(id);
      console.log(searchedPost);
      if (!searchedPost) {
        return 'This post doesnt exist';
      }
      return searchedPost;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updatedpostData: postWithDtoUpdate, user) {
    try {
      const searchedPost = await this.PostsModel.findOne({ _id: id });
      if (!searchedPost) {
        return 'This post doesnt exist';
      }
      const userPost = await this.UsersModel.findOne({ email: user.email });
      if (userPost.posts.includes(id)) {
        const updatedPost = await this.PostsModel.updateOne(
          { _id: id },
          updatedpostData,
        );
        return updatedPost;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string, user) {
    try {
      const searchedPost = await this.PostsModel.findOne({ _id: id });
      if (!searchedPost) {
        return 'This post doesnt exist';
      }
      const userPost = await this.UsersModel.findOne({ email: user.email });
      if (userPost.posts.includes(id)) {
        const deletedPost = await this.PostsModel.findByIdAndDelete(id);
        if (!deletedPost) {
          return { message: 'this post is not found' };
        }
        const removedPost = await this.PostsModel.findByIdAndDelete(id);
        await this.UsersModel.updateOne(
          { email: user.email },
          { $pull: { posts: id } },
        );
        return removedPost;
      } else {
        return { message: 'unAuthorize' };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
