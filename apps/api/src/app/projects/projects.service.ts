// Libraries
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
// Services
import { PidWinstonLogger } from '@pt/logger';
import { ConfigService } from '@nestjs/config';
// Models
import { CreateProjectDto, ProjectStatus } from '@pt/models';
import { ImageService, THUMBNAILFOLDER } from '@pt/image';
import { ProjectEntity } from '../utils';
// Misc.

@Injectable()
export class ProjectService {
  private HOT_FOLDER: string;
  private COLD_FOLDER: string;

  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    private readonly logger: PidWinstonLogger,
    private readonly imager: ImageService,
    private readonly configService: ConfigService
  ) {
    this.COLD_FOLDER = this.configService.get<string>('COLD_FOLDER');
    this.HOT_FOLDER = this.configService.get<string>('HOT_FOLDER');
  }

  async createProject(
    pid: string,
    project: CreateProjectDto,
    fileName?: string
  ): Promise<ProjectEntity> {
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

  async findProjectByLocation(
    location: string,
    pid: string
  ): Promise<ProjectEntity | null> {
    this.logger.pidLog(pid, `Checking if project with location: ${location}`);
    return this.projectRepo.findOneBy({ location });
  }

  getProjectStatus(input: ProjectEntity): ProjectEntity {
    const hotFolders = fs.readdirSync(this.HOT_FOLDER);
    const coldFolders = fs.readdirSync(this.COLD_FOLDER);

    const isInHot = hotFolders.findIndex((x) => x === input.location) > -1;
    const isInCold = coldFolders.findIndex((x) => x === input.location) > -1;

    let status = 0;

    switch (true) {
      case isInHot && isInCold:
        status = ProjectStatus.BOTH;
        break;
      case isInHot && !isInCold:
        status = ProjectStatus.ACTIVE;
        break;
      case !isInHot && isInCold:
        status = ProjectStatus.ARCHIVED;
        break;
    }

    return {
      ...input,
      status,
    };
  }

  async getProjects(pid: string): Promise<ProjectEntity[]> {
    this.logger.pidLog(pid, `Fetching all projects`);
    const dbProjects = (await this.projectRepo.find()).map((project) =>
      this.getProjectStatus(project)
    );
    this.logger.pidLog(pid, `Fetched ${dbProjects.length} projects from db`);

    this.logger.pidLog(pid, `Adding unregistered cold folders`);
    const coldFolders = fs.readdirSync(this.COLD_FOLDER);
    const coldAndDbProjects = this.addFoldersAsUnregistered(
      coldFolders,
      dbProjects
    );

    this.logger.pidLog(pid, `Adding unregistered hot folders`);
    const hotFolders = fs.readdirSync(this.HOT_FOLDER);
    const allProjects = this.addFoldersAsUnregistered(
      hotFolders,
      coldAndDbProjects
    );

    return allProjects;
  }

  private addFoldersAsUnregistered(
    folders: string[],
    input: ProjectEntity[]
  ): ProjectEntity[] {
    const output = [...input];

    folders.forEach((folder) => {
      if (folder !== THUMBNAILFOLDER) {
        const isRegistered =
          output.findIndex((x) => x.location === folder) > -1;
        if (!isRegistered) {
          output.push({
            id: -1 * output.length,
            location: folder,
            status: ProjectStatus.UNREGISTERED,
          } as ProjectEntity);
        }
      }
    });
    return output;
  }
}
