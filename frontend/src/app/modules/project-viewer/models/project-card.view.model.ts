import { Project } from './project.model';

export interface ProjectCardViewModel {
  project?: Project;
  isUnregistered: boolean;
  decodedStatus: string;
}
