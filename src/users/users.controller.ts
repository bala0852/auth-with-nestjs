/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(
    @Res() response,
    @Body() userDto: CreateUserDto,
  ): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
      const dto = {
        username: userDto.username,
        password: hashedPassword,
      };
      const user = await this.userService.createUser(dto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User created',
        user,
      });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.response);
    }
  }

  @Get()
  async getUser(@Res() response) {
    try {
      const user = await this.userService.getAllUser();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        user,
      });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.response);
    }
  }

  @Post('verify')
  async VerifyUser(@Res() response,@Body() userDto: CreateUserDto) {
    try {
      const user = await this.userService.verifyUserLogin(userDto.username);
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        user,
      });
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.response);
    }
  }
}
