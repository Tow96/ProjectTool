import { PidWinstonLogger } from '@app/winston';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import * as fs from 'fs';
import * as AdmZip from 'adm-zip';
import { HttpStatus } from '@nestjs/common/enums';
import { ConfigService } from '@nestjs/config';
import { ProjectRepository } from '../database';
import { Project } from '../database/entities';

@Injectable()
export class ArchivingService {
  constructor(
    private readonly logger: PidWinstonLogger,
    private readonly config: ConfigService,
    private readonly projects: ProjectRepository,
  ) {}

  private async getProject(id: number): Promise<Project> {
    const output = await this.projects.getById(id);
    if (output === null) {
      const message = `ProjectId: ${id} not found`;
      this.logger.pidLog(message);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return output;
  }

  async archiveProject(pid: string, project_id: number): Promise<string> {
    this.logger.setPid(pid);
    this.logger.pidLog(`Archiving project with id: ${project_id}`);
    const project = await this.getProject(project_id);

    const origin = `${this.config.get<string>('HOT_FOLDER')}/${project.location}`;
    const destination = `${this.config.get<string>('COLD_FOLDER')}/${project.location}.zip`;

    this.logger.pidLog(`Verifying that the project folder exists`);
    if (!fs.existsSync(origin)) {
      const message = `Folder ${origin} does not exist`;
      this.logger.pidLog(message);
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    this.logger.pidLog(`Creating zip file`);
    const zip = new AdmZip();
    zip.addLocalFolder(origin);
    zip.writeZip(destination);

    await this.projects.updateLastArchived(project_id);
    fs.rmSync(origin, { recursive: true });

    const message = `Archived project ${project_id} successfully`;
    this.logger.pidLog(message);
    return message;
  }

  async unarchiveProject(pid: string, project_id: number): Promise<string> {
    this.logger.setPid(pid);
    this.logger.pidLog(`Unarchiving project with id: ${project_id}`);
    const project = await this.getProject(project_id);

    const origin = `${this.config.get<string>('COLD_FOLDER')}/${project.location}.zip`;
    const destination = `${this.config.get<string>('HOT_FOLDER')}/${project.location}`;

    this.logger.pidLog(`Unzipping project`);
    const zip = new AdmZip(origin);
    zip.extractAllTo(destination, true);

    const message = `Unzipped project ${project_id} successfully`;
    this.logger.pidLog(message);
    return message;
  }
}
