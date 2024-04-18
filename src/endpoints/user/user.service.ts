import { Injectable } from '@nestjs/common';
import { userWithDtoCreate, userWithDtoUpdate } from './userWithDto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginWithDto } from './loginWithDto';
import { Response, response } from 'express';

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
        return {
          message: 'This email already exists',
          response: response.status(401),
        };
      }

      const passwordHash = await bcrypt.hash(
        userData.password,
        await bcrypt.genSalt(10),
      );

      userData.password = passwordHash;
      userData.email = userData.email.toLocaleLowerCase();

      const newUser = new this.UsersModel(userData);
      await newUser.save();
      return {
        message: 'You are registered successfully',
        response: response.status(200),
      };
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
        return {
          message: 'invalid email or password',
          response: response.status(401),
        };
      }
      const foundedUser = await bcrypt.compare(
        userData.password,
        user.password,
      );
      if (!foundedUser) {
        return {
          message: 'invalid email or password',
          response: response.status(401),
        };
      }
      const jwt = this.jwt.sign({
        email: user.email,
        role: user.role,
        _id: user._id,
      });
      res.header('jwt', jwt);
      return {
        user,
        token: jwt,
        message: 'you are logged successfully',
        response: response.status(200),
        role: 'Admin',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getUserProfile(userData) {
    const user = this.UsersModel.findOne({ email: userData.email });
    return user;
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
