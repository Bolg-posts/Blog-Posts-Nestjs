import { Injectable } from '@nestjs/common';
import { userWithDtoCreate, userWithDtoUpdate } from './userWithDto';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private UsersModel) {}

  async create(user: userWithDtoCreate) {
    console.log(user);
    const newUser = new this.UsersModel(user);
    await newUser.save();
    return newUser;
  }

  findAll() {
    return this.UsersModel.find({});
  }

  async findOne(id: string) {
    console.log(id);
    const searchedUser = await this.UsersModel.findById(id);
    console.log(searchedUser);
    return searchedUser;
  }

  async update(id: string, updatedUserData: userWithDtoUpdate) {
    console.log(id);
    console.log(updatedUserData);
    const updatedUser = await this.UsersModel.findByIdAndUpdate(
      id,
      updatedUserData,
    );
    console.log(updatedUser);
    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
