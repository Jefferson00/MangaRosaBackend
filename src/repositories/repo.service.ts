import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import User from '../models/users/entity/user.entity';
import Knowledges from '../models/knowledges/entity/knowledges.entity';
import Admin from '../models/auth/entity/admin.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Knowledges)
    public readonly knowledgeRepo: Repository<Knowledges>,
    @InjectRepository(Admin) public readonly adminRepo: Repository<Admin>,
  ) {}
}

export default RepoService;
