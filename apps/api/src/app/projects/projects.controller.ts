// Libraries
import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseInterceptors,
  UploadedFile,
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
import { CreateProjectDto } from '@pt/models';
import { ImageInterceptor } from '@pt/image';

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
  @UseInterceptors(ImageInterceptor())
  async createProject(
    @Req() req: LogIdRequest,
    @Body() project: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    // console.log(__dirname);
    console.log(project.name);
    console.log(file);

    return 'a';
    // return this.projectRepo.createProject(req['x-log-id'], project);
  }

  // @Get('c')
  // @ApiOperation({ summary: 'This is another test route' })
  // testB() {
  //   return 'b';
  // }
}
