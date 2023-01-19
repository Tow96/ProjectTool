import { Project } from '../models';

export const ProjectStore = 'projects';

export default interface ProjectState {
  projects: Project[];
}

export const initialState: ProjectState = {
  projects: [],
};
