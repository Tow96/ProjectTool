import { createFeatureSelector, createSelector } from '@ngrx/store';
import ProjectState, { ProjectStore } from './project.state';

export const getProjectState =
  createFeatureSelector<ProjectState>(ProjectStore);

export const getProjectsForCards = createSelector(getProjectState, (data) => {
  return {
    projects: data.projects,
  };
});
