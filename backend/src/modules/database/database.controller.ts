// Libraries
import { LogIdRequest } from '@app/winston';
import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

// Dto
import { CreateProjectDto } from './dto';

// Models
import { ProjectOutput } from './models';

// Services
import { ProjectRepository } from './repositories';

@Controller('api/project')
export class DatabaseController {
  constructor(@Inject(ProjectRepository) private readonly projectRepo: ProjectRepository) {}

  @Post()
  async createProject(
    @Req() req: LogIdRequest,
    @Body() project: CreateProjectDto,
  ): Promise<ProjectOutput> {
    return this.projectRepo.createProject(req['x-log-id'], project);
  }

  @Get()
  async getProjects(@Req() req: LogIdRequest): Promise<ProjectOutput[]> {
    return this.projectRepo.getAllProjects(req['x-log-id']);
  }
}
