// Libraries
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Services
import { PidWinstonLogger } from '@pt/logger';
// Models
import { CreateProjectDto, Project } from '@pt/models';
import { ImageService } from '@pt/image';
// Misc.

@Injectable()
export class ProjectService {
  private HOT_FOLDER: string;
  private COLD_FOLDER: string;

  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly logger: PidWinstonLogger, // private readonly configService: ConfigService
    private readonly imager: ImageService
  ) {}

  async findProjectByLocation(
    location: string,
    pid: string
  ): Promise<Project | null> {
    this.logger.pidLog(pid, `Checking if project with location: ${location}`);
    return this.projectRepo.findOneBy({ location });
  }

  async createProject(
    pid: string,
    project: CreateProjectDto,
    fileName?: string
  ): Promise<Project> {
    this.logger.pidLog(
      pid,
      `Creating project ${project.name} under location ${project.location}`
    );

    const newProject = await this.projectRepo.save({
      ...project,
      createdOn: new Date(),
      imageLocation: fileName || null,
    });

    if (fileName) {
      this.imager.keepImage(pid, fileName);
    }

    this.logger.pidLog(
      pid,
      `Created project: ${newProject.name} with id: ${newProject.id}`
    );

    return newProject;
  }
}
