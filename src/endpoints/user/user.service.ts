import { Injectable } from '@nestjs/common';
import { userWithDtoCreate, userWithDtoUpdate } from './userWithDto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginWithDto } from './loginWithDto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private UsersModel,
    private jwt: JwtService,
  ) {}

  async create(userData: userWithDtoCreate) {
    try {
      const user = await this.UsersModel.findOne({
        email: userData.email.toLowerCase(),
      });
      if (user) {
        return 'This email already exist';
      }

      const passwordHash = await bcrypt.hash(
        userData.password,
        await bcrypt.genSalt(10),
      );

      userData.password = passwordHash;
      userData.email = userData.email.toLocaleLowerCase();

      const newUser = new this.UsersModel(userData);
      await newUser.save();
      return 'You are registered successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async login(userData: loginWithDto, res: Response) {
    try {
      const user = await this.UsersModel.findOne({
        email: userData.email.toLocaleLowerCase(),
      });
      if (!user) {
        return 'invalid email or password';
      }
      const foundedUser = await bcrypt.compare(
        userData.password,
        user.password,
      );
      if (!foundedUser) {
        return 'invalid email or password';
      }
      const jwt = this.jwt.sign({
        email: user.email,
        role: user.role,
        _id: user._id,
      });
      res.header('jwt', jwt);
      return { token: jwt };
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.UsersModel.find().populate('posts');
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
