// Libraries
import {
  Body,
  Controller,
  Delete,
  Inject,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
// Services
import { ProjectService } from './projects.service';
// Models
import { LogIdRequest } from '@pt/logger';
import { CreateProjectDto, EditProjectDto, Project } from '@pt/models';
import { ImageInterceptor } from '@pt/image';
import { DeleteResult } from 'typeorm';

@Controller()
@ApiTags('Projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectService) private readonly projectRepo: ProjectService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Project an image can be added' })
  @ApiCreatedResponse({ description: 'The project was successfully created' })
  @ApiUnprocessableEntityResponse({
    description: 'The provided data has problems',
  })
  @UseInterceptors(ImageInterceptor())
  async createProject(
    @Req() req: LogIdRequest,
    @Body() projectdto: CreateProjectDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Project> {
    const pid = req['x-log-id'];

    const projectExists = await this.projectRepo.findProjectByLocation(
      projectdto.location,
      pid
    );
    if (projectExists !== null) {
      throw new HttpException(
        `Project with location "${projectdto.location}" already exists`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const project = await this.projectRepo.createProject(
      pid,
      projectdto,
      file?.filename || undefined
    );

    return project;
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all the projects' })
  @ApiOkResponse({ description: 'A list of the projects' })
  async readProjects(@Req() req: LogIdRequest): Promise<Project[]> {
    const pid = req['x-log-id'];
    return this.projectRepo.getProjects(pid);
  }

  @Put(':id')
  @UseInterceptors(ImageInterceptor())
  @ApiOperation({ summary: 'Updates the a project' })
  @ApiOkResponse({ description: 'The updated result' })
  @ApiUnprocessableEntityResponse({ description: 'Erroneous data provided' })
  @ApiNotFoundResponse({ description: "Project doesn't exist" })
  async updateProject(
    @Req() req: LogIdRequest,
    @Param('id') id: number,
    @Body() data: EditProjectDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Project> {
    const pid = req['x-log-id'];
    const project = await this.projectRepo.findById(pid, id);
    if (project === null) {
      throw new HttpException(
        `Project with id: ${id} not found`,
        HttpStatus.NOT_FOUND
      );
    }
    return this.projectRepo.updateProject(
      pid,
      project,
      data,
      file?.filename || undefined
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes a Project from the Database' })
  @ApiOkResponse({ description: 'The delete result' })
  async deleteProject(
    @Req() req: LogIdRequest,
    @Param('id') id: number
  ): Promise<DeleteResult> {
    const pid = req['x-log-id'];
    return this.projectRepo.deleteProject(pid, id);
  }
}
