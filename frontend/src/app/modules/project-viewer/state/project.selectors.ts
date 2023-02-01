import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectCardViewModel, ProjectStatus } from '../models';
import * as fromReducer from './project.reducer';

export const selectProjectState = createFeatureSelector<fromReducer.State>(
  fromReducer.projectsFeatureKey
);

// -------------------------------------------------------------------
// Basic Selectors
// -------------------------------------------------------------------
export const selectAllIds = createSelector(
  selectProjectState,
  fromReducer.selectIds
);

export const selectAllProjects = createSelector(
  selectProjectState,
  fromReducer.selectAll
);

export const selectAllEntities = createSelector(
  selectProjectState,
  fromReducer.selectEntities
);

export const selectProjectByLocation = (location: string) =>
  createSelector(selectAllEntities, (entities) => entities[location]);

// -------------------------------------------------------------------
// View Models
// -------------------------------------------------------------------
export const selectProjectViewerViewModel = createSelector(
  selectAllIds,
  (ids) => {
    const idNum = ids.map((i) => parseInt(i.toString()));
    return idNum;
  }
);

export const selectProjectCardViewModel = (location: string) =>
  createSelector(
    selectProjectByLocation(location),
    (project): ProjectCardViewModel => {
      let decodedStatus = 'Unregistered';
      switch (project?.status) {
        case ProjectStatus.HOT:
          decodedStatus = 'Active';
          break;
        case ProjectStatus.COOL:
          decodedStatus = 'Backed-up';
          break;
        case ProjectStatus.COLD:
          decodedStatus = 'Archived';
          break;
        case ProjectStatus.LOST:
          decodedStatus = 'Missing';
          break;
      }

      return {
        project,
        isUnregistered: project?.status === ProjectStatus.UNREGISTERED,
        decodedStatus,
      };
    }
  );
