import { Controller, Get } from '@nestjs/common';

import Knowledges from './entity/knowledges.entity';
import { KnowledgeService } from './knowledges.service';

@Controller()
export class KnowledgeController {
  constructor(private knowledgeService: KnowledgeService) {}

  @Get('/knowledges')
  async index(): Promise<Knowledges[]> {
    return this.knowledgeService.findAll();
  }
}
