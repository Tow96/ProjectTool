import { createSelector } from '@ngrx/store';
import { Project } from '@pt/models';
import {
  MainViewModel,
  ProjectFormViewModel,
  ProjectHelpers,
  ScreenSizeColumns,
} from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectFormViewModel = createSelector(
  ProjectSelectors.selectLoadState,
  (loadState): ProjectFormViewModel => ({ loading: loadState.formLoading })
);

export const selectMainViewModel = (screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
  createSelector(
    ProjectSelectors.selectAll,
    ProjectSelectors.selectSearchInput,
    ProjectSelectors.selectLoadState,
    (projects, searchInput, loadState): MainViewModel => {
      let filteredProjects = [...projects];

      // Keyword filter
      if (searchInput.trim() !== '') {
        filteredProjects = ProjectHelpers.filterProjects(searchInput, filteredProjects);
      }

      const chunkSize = ScreenSizeColumns[screenSize];
      const chunkedProjects: Project[][] = [];

      for (let i = 0; i < filteredProjects.length; i += chunkSize) {
        const chunk = filteredProjects.slice(i, i + chunkSize);
        chunkedProjects.push(chunk);
      }

      return {
        projects: chunkedProjects,
        searchInput,
        loaded: loadState.loaded,
        loading: loadState.loading,
      };
    }
  );
