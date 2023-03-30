import { createSelector } from '@ngrx/store';
import { Project } from '@pt/models';
import { MainViewModel, ProjectHelpers, ScreenSizeColumns } from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectMainViewModel = (screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
  createSelector(
    ProjectSelectors.selectAll,
    ProjectSelectors.selectSearchInput,
    (projects, searchInput): MainViewModel => {
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
      };
    }
  );
