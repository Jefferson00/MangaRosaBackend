import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import User from './entity/user.entity';
import { CreateUserDTO } from './dtos/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';

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

  @Post('/users/create')
  async createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/users/validate/:id')
  async validateUser(
    @Body() body: { isValidate: boolean },
    @Param() id: number,
  ): Promise<User> {
    return this.userService.validate(body.isValidate, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users/search')
  async searchInUser(
    @Body() body: { searchValue: string },
  ): Promise<User[] | undefined> {
    return this.userService.search(body.searchValue);
  }
}
