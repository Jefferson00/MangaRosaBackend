import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import User from './user.entity';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  async find(@Param() id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Post('/user/create')
  async createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userService.create(body);
  }
}
