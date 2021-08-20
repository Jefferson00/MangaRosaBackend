/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import RepoService from 'src/services/repo.service';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

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
      throw new Error('Incorrect name or password');
    }

    const passwordMatched = await compare(password, admin.password);

    if (!passwordMatched) {
      throw new Error('Incorrect name or password');
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
