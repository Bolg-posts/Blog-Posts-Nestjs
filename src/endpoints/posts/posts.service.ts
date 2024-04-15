import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { postWithDtoCreate, postWithDtoUpdate } from './postWithDto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('posts') private PostsModel) {}

  async create(post: postWithDtoCreate) {
    console.log(post);
    const newPost = new this.PostsModel(post);
    await newPost.save();
    return newPost;
  }

  findAll() {
    return this.PostsModel.find({});
  }

  async findOne(id: string) {
    console.log(id);
    const searchedPost = await this.PostsModel.findById(id);
    console.log(searchedPost);
    return searchedPost;
  }

  async update(id: string, updatedpostData: postWithDtoUpdate) {
    console.log(updatedpostData);
    console.log(id);
    const updatedPost = await this.PostsModel.findByIdAndUpdate(
      id,
      updatedpostData,
    );
    console.log(updatedPost);
    return updatedPost;
  }

  async remove(id: string) {
    console.log(id);
    const removedPost = await this.PostsModel.findByIdAndDelete(id);
    console.log(removedPost);
    return removedPost;
  }
}
