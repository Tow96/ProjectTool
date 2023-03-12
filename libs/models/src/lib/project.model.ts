import { ProjectStatus } from './project-status.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  tags: number[];
  location: string;
  imageLocation: string | null;
  createdOn: Date;
  lastArchived: Date;
  status: ProjectStatus;
}
