import { Project } from '@pt/models';

export interface MainViewModel {
  projects: Project[][];
  searchInput: string;
}
