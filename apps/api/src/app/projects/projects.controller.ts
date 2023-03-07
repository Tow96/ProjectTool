// Libraries
import { Body, Controller, Inject, Get, Post, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
// Services
import ProjectService from './projects.service';
// Models
import { LogIdRequest } from '@pt/logger';
import { CreateProjectDto, Project } from '@pt/models';

@Controller()
@ApiTags('Projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectService) private readonly projectRepo: ProjectService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Project' })
  @ApiCreatedResponse({ description: 'The project was successfully created' })
  @ApiUnprocessableEntityResponse({
    description: 'The provided data has problems',
  })
  async createProject(
    @Req() req: LogIdRequest,
    @Body() project: CreateProjectDto
  ): Promise<Project> {
    return this.projectRepo.createProject(req['x-log-id'], project);
  }

  // @Get('c')
  // @ApiOperation({ summary: 'This is another test route' })
  // testB() {
  //   return 'b';
  // }
}
