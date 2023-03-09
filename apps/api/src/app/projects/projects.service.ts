// Libraries
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Services
import { ConfigService } from '@nestjs/config';
import { PidWinstonLogger } from '@pt/logger';
// Models
import { CreateProjectDto, Project } from '@pt/models';
// Misc.

@Injectable()
export class ProjectService {
  private HOT_FOLDER: string;
  private COLD_FOLDER: string;

  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project> // private readonly logger: PidWinstonLogger,
  ) // private readonly configService: ConfigService
  {}

  // async createProject(
  //   pid: string,
  //   project: CreateProjectDto
  // ): Promise<Project> {
  //   this.logger.pidLog(
  //     pid,
  //     `Creating project ${project.name} under location ${project.location}`
  //   );

  //   // Location is the definining factor
  //   this.logger.pidLog(
  //     pid,
  //     `Checking that the location is not already registered`
  //   );
  //   const projectExists = await this.projectRepo.findBy({
  //     location: project.location,
  //   });
  //   if (projectExists.length > 0) {
  //     const message = `project on location ${project.location} already registered`;
  //     this.logger.pidLog(pid, message);
  //     throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
  //   }

  //   // Inserts the project
  //   const preProject = this.projectRepo.create({
  //     name: project.name,
  //     description: project.description,
  //     tags: [],
  //     location: project.location,
  //     lastArchived: null,
  //   });
  //   const createdProject = await this.projectRepo.save({
  //     ...preProject,
  //     createdOn: new Date(),
  //   });
  //   this.logger.pidLog(
  //     pid,
  //     `Created project: ${createdProject.name} with id: ${createdProject.id}`
  //   );

  //   return preProject;
  // }
}
