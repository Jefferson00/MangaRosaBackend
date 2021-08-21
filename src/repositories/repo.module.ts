import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';
import Admin from '../models/auth/entity/admin.entity';
import Knowledges from '../models/knowledges/entity/knowledges.entity';
import User from '../models/users/entity/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Knowledges, Admin])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
