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
      is_validated: false,
      phone: createUserData.phone,
      knowledges: createUserData.knowledges,
      validated_at: null,
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

    return userCreated;
  }

  async validate(isValidate: boolean, id: number): Promise<User> {
    const user = await this.repoService.userRepo.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.is_validated = isValidate;
    user.validated_at = new Date();

    return this.repoService.userRepo.save(user);
  }
}
