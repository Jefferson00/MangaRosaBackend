/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import RepoService from '../../repositories/repo.service';

import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly repoService: RepoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(name: string, password: string) {
    const admin = await this.repoService.adminRepo.findOne({
      where: { name },
    });

    if (!admin) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Incorrect name or password',
      }, HttpStatus.BAD_REQUEST);
    }

    const passwordMatched = await compare(password, admin.password);

    if (!passwordMatched) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Incorrect name or password',
      }, HttpStatus.BAD_REQUEST);
    }

    return { id: admin.id, name: admin.name };
  }

  async authAdmin(admin: { name: string, id: number }) {
    const payload = { name: admin.name, id: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
