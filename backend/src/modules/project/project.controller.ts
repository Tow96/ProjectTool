// Libraries
import { Body, Controller, Delete, Inject, Get, Param, Post, Put, Req } from '@nestjs/common';
import { LogIdRequest } from '@shared/logger';
import { DeleteResult } from 'typeorm';
// Services
import ProjectService from './project.service';
// Models
import { CreateProjectDto, EditProjectDto, ProjectOutput } from './models';

@Controller('api/project')
export class ProjectController {
  constructor(@Inject(ProjectService) private readonly projectRepo: ProjectService) {}

  @Get()
  async getProjects(@Req() req: LogIdRequest): Promise<ProjectOutput[]> {
    return this.projectRepo.getAllProjects(req['x-log-id']);
  }

  @Post()
  async createProject(
    @Req() req: LogIdRequest,
    @Body() project: CreateProjectDto,
  ): Promise<ProjectOutput> {
    return this.projectRepo.createProject(req['x-log-id'], project);
  }

  @Delete(':id')
  async deleteProject(@Req() req: LogIdRequest, @Param('id') id: string): Promise<DeleteResult> {
    return this.projectRepo.deleteProject(req['x-log-id'], id);
  }

  @Put(':id')
  async updateProject(
    @Req() req: LogIdRequest,
    @Param('id') id: string,
    @Body() project: EditProjectDto,
  ): Promise<ProjectOutput> {
    return this.projectRepo.updateProject(req['x-log-id'], id, project);
  }
}
