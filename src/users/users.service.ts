/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './user.interface';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('userTable') private userModel: Model<UserInterface>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async getAllUser(): Promise<UserInterface[]> {
    const user = await this.userModel.find();
    if (!user) {
      throw new NotFoundException('Students data not found!');
    }
    return user;
  }
  async getUser(query: object): Promise<UserInterface> {
    return this.userModel.findOne(query);
  }
  async verifyUserLogin(username : string) {
    const user = this.userModel.find({username: username}).exec();
    if(user){ 
      return user;
    }
  }

}
