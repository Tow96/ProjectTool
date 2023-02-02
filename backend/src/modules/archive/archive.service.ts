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

  private zipFolder(pid: string, zip: AdmZip, origin: string, folder: string) {
    const ignoredFolders = this.config.get<string>('ZIP_IGNORE').split(',');
    const folderContents = fs.readdirSync(`${origin}/${folder}`);
    for (const index in folderContents) {
      const content = folderContents[index];
      const relativePath = `${folder}/${content}`;

      if (ignoredFolders.includes(content)) {
        this.logger.pidLog(pid, `Skipping ${relativePath}`);
        continue;
      }

      if (fs.lstatSync(`${origin}/${relativePath}`).isDirectory()) {
        this.zipFolder(pid, zip, origin, relativePath);
      } else {
        zip.addLocalFile(`${origin}/${relativePath}`, `${folder}`);
      }
    }
  }

  async archiveProject(pid: string, project_id: number): Promise<number> {
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
    this.zipFolder(pid, zip, `${this.config.get<string>('HOT_FOLDER')}`, project.location);

    this.logger.pidLog(pid, `Writing zip file`);
    zip.writeZip(destination);

    this.logger.pidLog(pid, `Removing folder`);
    fs.rmdirSync(origin, { recursive: true });

    return this.projects.getProjectStatus(project.location);
  }

  async unarchiveProject(pid: string, project_id: number): Promise<number> {
    this.logger.pidLog(pid, `Unarchiving project with id: ${project_id}`);
    const project = await this.projects.getById(project_id);
    if (!project) {
      const message = `ProjectId: ${project_id} not found`;
      this.logger.pidLog(pid, message);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const origin = `${this.config.get<string>('COLD_FOLDER')}/${project.location}.zip`;
    const destination = `${this.config.get<string>('HOT_FOLDER')}`;

    this.logger.pidLog(pid, `Unzipping project`);
    const zip = new AdmZip(origin);
    zip.extractAllTo(destination, true);

    this.logger.pidLog(pid, `Unzipped project ${project_id} successfully`);
    const newStatus = this.projects.getProjectStatus(project.location);

    return newStatus;
  }
}
