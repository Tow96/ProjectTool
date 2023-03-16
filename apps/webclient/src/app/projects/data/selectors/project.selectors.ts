import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromProjects } from '..';

const selectProjectState = createFeatureSelector<fromProjects.State>(
  fromProjects.projectsFeatureKey
);

export const selectIds = createSelector(
  selectProjectState,
  fromProjects.selectIds
);

export const selectAll = createSelector(
  selectProjectState,
  fromProjects.selectAll
);
