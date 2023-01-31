// Libraries
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
// Services
import { ConfigService } from '@nestjs/config';
import { PidWinstonLogger } from '@shared/logger';
import ProjectService from '../project/project.service';

@Injectable()
export default class ArchiveService {
  constructor(
    private readonly logger: PidWinstonLogger,
    private readonly config: ConfigService,
    private readonly projects: ProjectService,
  ) {}

  async archiveProject(pid: string, project_id: number): Promise<string> {
    this.logger.pidLog(pid, `Archiving project with id: ${project_id}`);
    const project = await this.projects.getById(project_id);
    if (!project) {
      const message = `ProjectId: ${project_id} not found`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const origin = `${this.config.get<string>('HOT_FOLDER')}/${project.location}`;
    const destination = `${this.config.get<string>('COLD_FOLDER')}/${project.location}.zip`;

    this.logger.pidLog(pid, `Verifying that the project folder exists`);
    if (!fs.existsSync(origin)) {
      const message = `Folder ${origin} does not exist`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    this.logger.pidLog(pid, `Creating zip file`);
    const zip = new AdmZip();
    zip.addLocalFolder(origin);
    // TODO: Set editable ignore folders
    zip.deleteFile('node_modules/');
    zip.writeZip(destination);

    await this.projects.updateLastArchived(project_id);
    fs.rmSync(origin, { recursive: true });

    const message = `Archived project ${project_id} successfully`;
    this.logger.pidLog(pid, message);
    return message;
  }

  async unarchiveProject(pid: string, project_id: number): Promise<string> {
    this.logger.pidLog(pid, `Unarchiving project with id: ${project_id}`);
    const project = await this.projects.getById(project_id);
    if (!project) {
      const message = `ProjectId: ${project_id} not found`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const origin = `${this.config.get<string>('COLD_FOLDER')}/${project.location}.zip`;
    const destination = `${this.config.get<string>('HOT_FOLDER')}/${project.location}`;

    this.logger.pidLog(pid, `Unzipping project`);
    const zip = new AdmZip(origin);
    zip.extractAllTo(destination, true);

    const message = `Unzipped project ${project_id} successfully`;
    this.logger.pidLog(pid, message);
    return message;
  }
}
