// Libraries
import { LogIdRequest } from '@app/winston';
import { Body, Controller, Delete, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { DeleteResult } from 'typeorm';

// Dto
import { CreateProjectDto, EditProjectDto } from './dto';

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

  @Put(':id')
  async updateProject(
    @Req() req: LogIdRequest,
    @Param('id') id: string,
    @Body() project: EditProjectDto,
  ): Promise<ProjectOutput> {
    return this.projectRepo.updateProject(req['x-log-id'], id, project);
  }

  @Delete(':id')
  async deleteProject(@Req() req: LogIdRequest, @Param('id') id: string): Promise<DeleteResult> {
    return this.projectRepo.deleteProject(req['x-log-id'], id);
  }
}
