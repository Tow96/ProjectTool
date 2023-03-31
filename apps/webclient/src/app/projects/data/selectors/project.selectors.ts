import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromProjects } from '..';

const selectProjectState = createFeatureSelector<fromProjects.State>(
  fromProjects.projectsFeatureKey
);

export const selectIds = createSelector(selectProjectState, fromProjects.selectIds);

export const selectAll = createSelector(selectProjectState, fromProjects.selectAll);

export const selectLastUpdated = createSelector(selectProjectState, (state) => state.lastUpdated);

export const selectLoadState = createSelector(selectProjectState, (state) => ({
  loaded: state.loaded,
  loading: state.loading,
  formLoading: state.formLoading,
}));

export const selectSearchInput = createSelector(selectProjectState, (state) => state.searchInput);
