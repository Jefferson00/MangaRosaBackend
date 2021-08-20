import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../models/users/user.entity';
import Knowledges from '../models/knowledges/knowledges.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Knowledges)
    public readonly knowledgeRepo: Repository<Knowledges>,
  ) {}
}

export default RepoService;
