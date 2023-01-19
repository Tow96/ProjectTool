import { Project } from '../entities';

export class ProjectOutput extends Project {
  lastModified?: Date;
  status: number;
}
