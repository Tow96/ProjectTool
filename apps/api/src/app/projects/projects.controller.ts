// Libraries
import {
  Body,
  Controller,
  Inject,
  Post,
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
} from '@nestjs/swagger';
// Services
import { ProjectService } from './projects.service';
// Models
import { LogIdRequest } from '@pt/logger';
import { CreateProjectDto, Project } from '@pt/models';
import { ImageInterceptor } from '@pt/image';

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
}
