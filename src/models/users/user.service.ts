import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import User from './entity/user.entity';
import RepoService from '../../repositories/repo.service';
import { CreateUserDTO } from './dtos/user.dto';

import { classToClass } from 'class-transformer';
import { Like } from 'typeorm';

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
      order: { name: 'ASC' },
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
    const findUserWithSameCpf = await this.repoService.userRepo.findOne({
      where: {
        cpf: createUserData.cpf,
      },
    });

    if (findUserWithSameCpf) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'CPF is already registered',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Some of knowledges informed is invalid',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    await Promise.all(checkAllKnowledges);

    const userCreated = await this.repoService.userRepo.save(user);

    return classToClass(userCreated);
  }

  /**
   * Update is_validated boolean value and set a date for validated_at
   * @param isValidate boolean
   * @param id number
   * @returns User
   */
  async validate(isValidate: boolean, id: number): Promise<User> {
    const user = await this.repoService.userRepo.findOne(id, {
      relations: ['knowledges'],
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.is_validated = isValidate;
    user.validated_at = new Date();

    const userValidated = this.repoService.userRepo.save(user);

    return userValidated;
  }

  /**
   * Search in user table for values that start with the informed value
   * @param searchValue string
   * @returns User[] | undefined
   */
  async search(searchValue: string): Promise<User[] | undefined> {
    const users = await this.repoService.userRepo.find({
      relations: ['knowledges'],
      where: [
        {
          name: Like(`${searchValue}%`),
        },
        {
          cpf: Like(`${searchValue}%`),
        },
        {
          email: Like(`${searchValue}%`),
        },
        {
          phone: Like(`${searchValue}%`),
        },
      ],
    });

    return classToClass(users);
  }
}
