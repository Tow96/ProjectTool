// Libraries
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
// Entities
import { CreateProjectDto, EditProjectDto, Project, ProjectOutput } from './models';
// Services
import { ConfigService } from '@nestjs/config';
import { PidWinstonLogger } from '@shared/logger';
// Constants
import ProjectStatus from './constants/status.enum';

@Injectable()
export default class ProjectService {
  private HOT_FOLDER: string;
  private COLD_FOLDER: string;

  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly logger: PidWinstonLogger,
    private readonly configService: ConfigService,
  ) {
    this.HOT_FOLDER = this.configService.get<string>('HOT_FOLDER');
    this.COLD_FOLDER = this.configService.get<string>('COLD_FOLDER');
  }

  private convertToOutput(input: Project): ProjectOutput {
    return {
      ...input,
      status: this.getProjectStatus(input.location),
    };
  }

  private getProjectStatus(location: string): number {
    const hotDirectories = fs.readdirSync(this.HOT_FOLDER);
    const coldDirectories = fs.readdirSync(this.COLD_FOLDER).map((x) => x.split('.')[0]);

    switch (true) {
      case hotDirectories.includes(location) && !coldDirectories.includes(location):
        return ProjectStatus.HOT;
      case hotDirectories.includes(location) && coldDirectories.includes(location):
        return ProjectStatus.COOL;
      case !hotDirectories.includes(location) && coldDirectories.includes(location):
        return ProjectStatus.COLD;
      case !hotDirectories.includes(location) && !coldDirectories.includes(location):
        return ProjectStatus.LOST;
    }
  }

  async createProject(pid: string, project: CreateProjectDto): Promise<ProjectOutput> {
    this.logger.pidLog(pid, `Creating project ${project.name} under location ${project.location}`);

    // Location is the definining factor
    this.logger.pidLog(pid, `Checking that the location is not already registered`);
    const projectExists = await this.projectRepo.findBy({
      location: project.location,
    });
    if (projectExists.length > 0) {
      const message = `project on location ${project.location} already registered`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const status = this.getProjectStatus(project.location);
    const lastArchived = status === ProjectStatus.COOL || ProjectStatus.COLD ? new Date() : null;
    // TODO: set last modified when hot/cool

    // Inserts the project
    const preProject = this.projectRepo.create({
      name: project.name,
      description: project.description,
      tags: project.tags,
      location: project.location,
      lastArchived,
    });
    const createdProject = await this.projectRepo.save({ ...preProject, createdOn: new Date() });
    this.logger.pidLog(
      pid,
      `Created project: ${createdProject.name} with id: ${createdProject.id}`,
    );

    const output = this.convertToOutput(createdProject);

    return output;
  }

  async deleteProject(pid: string, id: string): Promise<DeleteResult> {
    // For data safety purposes, only the project is deleted, not the folders
    this.logger.pidLog(pid, `Removing project_id: ${id}`);

    const deletion = await this.projectRepo.delete({ id: parseInt(id) || -1 });

    switch (deletion.affected) {
      case 0:
        this.logger.pidLog(pid, `Project_id ${id} not found`);
        break;
      case 1:
        this.logger.pidLog(pid, `Project_id: ${id} deleted`);
        break;
      default:
        this.logger.pidError(pid, `More than one project was deleted`);
    }
    return deletion;
  }

  async getAllProjects(pid: string): Promise<ProjectOutput[]> {
    this.logger.pidLog(pid, 'Fetching all projects');

    const output: ProjectOutput[] = [];

    // Fetches the projects from the db
    const dbProjects = await this.projectRepo.find({});

    this.logger.pidLog(pid, 'Setting current status');
    // Goes through each project to get its status
    // TODO: Set Last Modified
    dbProjects.forEach((project) => {
      output.push(this.convertToOutput(project));
    });

    this.logger.pidLog(pid, 'Fetching unregistered projects');
    // Also adds all the unregistered projects with negative id's
    let unregisteredId = -1;
    const hotDirectories = fs.readdirSync(this.HOT_FOLDER);
    const coldDirectories = fs.readdirSync(this.COLD_FOLDER).map((x) => x.split('.')[0]);
    hotDirectories.forEach((dir) => {
      const dirIndex = output.findIndex((x) => x.location === dir);

      if (dirIndex === -1) {
        output.push({
          id: unregisteredId,
          description: '',
          createdOn: new Date(),
          imageLocation: '',
          location: dir,
          name: dir,
          status: ProjectStatus.UNREGISTERED,
          tags: [],
          lastArchived: new Date(),
        });
        unregisteredId--;
      }
    });
    coldDirectories.forEach((dir) => {
      const dirIndex = output.findIndex((x) => x.location === dir);

      if (dirIndex === -1) {
        output.push({
          id: unregisteredId,
          description: '',
          createdOn: new Date(),
          imageLocation: '',
          location: dir,
          name: dir,
          status: ProjectStatus.UNREGISTERED,
          tags: [],
          lastArchived: new Date(),
        });
        unregisteredId--;
      }
    });

    // TODO: Add images

    return output;
  }

  getById(id: number): Promise<Project> {
    return this.projectRepo.findOne({ where: { id } });
  }

  updateLastArchived(id: number): Promise<UpdateResult> {
    return this.projectRepo.update(id, { lastArchived: new Date() });
  }

  async updateProject(pid: string, id: string, project: EditProjectDto): Promise<ProjectOutput> {
    this.logger.pidLog(pid, `Updating project with id: ${id}`);
    const original = await this.getById(parseInt(id) || -1);
    if (original === null) {
      const message = `ProjectId: ${id} not found`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    // This ensures only certain fields are updatable
    const changes: any = {};
    if (project.name && project.name !== original.name) changes.name = project.name;
    if (project.description && project.description !== original.description)
      changes.description = project.description;

    if (Object.keys(changes).length === 0) {
      this.logger.pidLog(pid, 'No changes necessary');
      return this.convertToOutput(original);
    }

    const updatedProject = await this.projectRepo.save({
      ...original,
      ...changes,
    });

    this.logger.pidLog(pid, `Project ${id} updated`);

    return updatedProject;
  }
}
