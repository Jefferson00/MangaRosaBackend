import { Injectable } from '@nestjs/common';
import User from './user.entity';
import RepoService from 'src/services/repo.service';
import { CreateUserDTO } from './user.dto';
import { classToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}

  /**
   *  Find all users
   * @returns Users[]
   */
  async findAll(): Promise<User[]> {
    const users = await this.repoService.userRepo.find({
      relations: ['knowledges'],
    });

    return classToClass(users);
  }

  async find(id: number): Promise<User> {
    const user = this.repoService.userRepo.findOne(id, {
      relations: ['knowledges'],
    });

    return classToClass(user);
  }

  /**
   * Validate knowledges, create user and userKnowledge relation
   * @param createUserData: CreateUserDTO
   * @returns User created
   */
  async create(createUserData: CreateUserDTO): Promise<User> {
    const user = this.repoService.userRepo.create({
      name: createUserData.name,
      email: createUserData.email,
      cpf: createUserData.cpf,
      isValidated: false,
      phone: createUserData.phone,
      knowledges: createUserData.knowledges,
    });

    const checkAllKnowledges = createUserData.knowledges.map(
      async (knowledge) => {
        const res = await this.repoService.knowledgeRepo.findOne(knowledge.id);

        if (!res) {
          throw new Error('Some of knowledges informed is invalid.');
        }
      },
    );

    await Promise.all(checkAllKnowledges);

    const userCreated = await this.repoService.userRepo.save(user);

    /*const saveUserKnowledges = createUserData.knowledges.map(
      async (knowledge) => {
        const userKnowledge = this.repoService.userKnowledgeRepo.create({
          knowledges_id: knowledge.id,
          users_id: userCreated.id,
        });

        await this.repoService.userKnowledgeRepo.save(userKnowledge);
      },
    );

    await Promise.all(saveUserKnowledges);*/

    return userCreated;
  }
}
