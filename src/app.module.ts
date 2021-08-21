import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoModule from './repositories/repo.module';
import { AuthModule } from './models/auth/auth.module';

import { UserController } from './models/users/user.controller';
import { UserService } from './models/users/user.service';
import { KnowledgeController } from './models/knowledges/knowledges.contoller';
import { KnowledgeService } from './models/knowledges/knowledges.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(), RepoModule],
  controllers: [UserController, KnowledgeController],
  providers: [UserService, KnowledgeService],
})
export class AppModule {}
