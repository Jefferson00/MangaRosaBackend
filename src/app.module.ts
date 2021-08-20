import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './models/repo.module';
import { UserController } from './models/users/user.controller';
import { UserService } from './models/users/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(), RepoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
