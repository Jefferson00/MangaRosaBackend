import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from '../services/repo.service';
import Admin from './auth/admin.entity';
import Knowledges from './knowledges/knowledges.entity';
import User from './users/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Knowledges, Admin])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
