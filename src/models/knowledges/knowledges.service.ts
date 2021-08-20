import { Injectable } from '@nestjs/common';

import RepoService from '../../services/repo.service';
import Knowledges from './knowledges.entity';

@Injectable()
export class KnowledgeService {
  constructor(private readonly repoService: RepoService) {}

  /**
   * List all knowledges
   * @returns knowledge []
   */
  async findAll(): Promise<Knowledges[]> {
    const knowledge = await this.repoService.knowledgeRepo.find();

    return knowledge;
  }
}
