// Libraries
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';
// Services
import { PidWinstonLogger } from '@pt/logger';
import { ConfigService } from '@nestjs/config';
// Models
import { ImageService, THUMBNAILFOLDER } from '@pt/image';
import { ProjectStatus } from '@pt/models';
import { CreateProjectDto, EditProjectDto, ProjectEntity } from '../utils';
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
    this.logger.pidLog(pid, `Creating project ${project.name} under location ${project.location}`);

    const newProject = await this.projectRepo.save({
      ...project,
      createdOn: new Date(),
      imageLocation: fileName || null,
    });

    if (fileName) {
      this.imager.keepImage(pid, fileName);
    }

    this.logger.pidLog(pid, `Created project: ${newProject.name} with id: ${newProject.id}`);

    return newProject;
  }

  async deleteProject(pid: string, id: number): Promise<DeleteResult> {
    this.logger.pidLog(pid, `Deleting project: ${id}`);

    const project = await this.findById(pid, id);
    if (project === null) {
      throw new HttpException(`Project with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (project.imageLocation) {
      this.imager.deleteImage(pid, project.imageLocation);
    }

    const deletedProject = await this.projectRepo.delete({ id });

    this.logger.pidLog(pid, `Deleted: ${deletedProject.affected} project(s)`);

    return deletedProject;
  }

  async findById(pid: string, id: number): Promise<ProjectEntity | null> {
    this.logger.pidLog(pid, `Fetching project with id: ${id}`);
    const dbProject = await this.projectRepo.findOneBy({ id });
    if (dbProject === null) return null;

    return this.getProjectStatus(dbProject);
  }

  async findProjectByLocation(location: string, pid: string): Promise<ProjectEntity | null> {
    this.logger.pidLog(pid, `Checking if project with location: ${location}`);
    return this.projectRepo.findOneBy({ location });
  }

  getProjectStatus(input: ProjectEntity): ProjectEntity {
    const hotFolders = fs.readdirSync(this.HOT_FOLDER);
    const coldFolders = fs.readdirSync(this.COLD_FOLDER);

    const isInHot = hotFolders.findIndex((x) => x === input.location) > -1;
    const isInCold = coldFolders.findIndex((x) => x === `${input.location}.zip`) > -1;

    let status = ProjectStatus.NOTFOUND;

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
    const coldAndDbProjects = this.addFoldersAsUnregistered(coldFolders, dbProjects);

    this.logger.pidLog(pid, `Adding unregistered hot folders`);
    const hotFolders = fs.readdirSync(this.HOT_FOLDER);
    const allProjects = this.addFoldersAsUnregistered(hotFolders, coldAndDbProjects);

    return allProjects;
  }

  private addFoldersAsUnregistered(folders: string[], input: ProjectEntity[]): ProjectEntity[] {
    const output = [...input];

    folders.forEach((folder) => {
      const noExtFolder =
        folder.lastIndexOf('.') > 0 ? folder.substring(0, folder.lastIndexOf('.')) : folder;

      if (noExtFolder !== THUMBNAILFOLDER) {
        const isRegistered = output.findIndex((x) => x.location === noExtFolder) > -1;

        if (!isRegistered) {
          output.push({
            id: -1 * output.length,
            location: noExtFolder,
            status: ProjectStatus.UNREGISTERED,
          } as ProjectEntity);
        }
      }
    });
    return output;
  }

  async updateProject(
    pid: string,
    original: ProjectEntity,
    data: EditProjectDto,
    fileName?: string
  ): Promise<ProjectEntity> {
    const clearImage = data.removeImg;
    let imageLocation = clearImage ? null : original.imageLocation;

    // This ensures only certain fields are updatable
    const changes: Partial<ProjectEntity> = {};
    // Name
    if (data.name && data.name !== original.name) {
      changes.name = data.name;
    }
    // Description
    if (data.description && data.description !== original.description) {
      changes.description = data.description;
    }
    // Image
    if (fileName && fileName !== original.imageLocation) {
      imageLocation = fileName;
    }

    if (Object.keys(changes).length === 0 && !fileName && !clearImage) {
      this.logger.pidLog(pid, 'No changes necessary');
      return this.getProjectStatus(original);
    }

    const updateProject = await this.projectRepo.save({
      ...original,
      ...changes,
      imageLocation,
    });

    if (original.imageLocation !== null && (clearImage || fileName)) {
      this.imager.deleteImage(pid, original.imageLocation);
    }

    if (fileName) {
      this.imager.keepImage(pid, fileName);
    }

    this.logger.pidLog(pid, `Project ${original.id} updated`);

    return updateProject;
  }
}
