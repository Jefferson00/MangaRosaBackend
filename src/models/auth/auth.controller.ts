/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local.guard';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('admin/auth')
  async authAdmin(@Request() req: any) {
    //console.log(req.admin)
    return this.authService.authAdmin(req);
  }
}
