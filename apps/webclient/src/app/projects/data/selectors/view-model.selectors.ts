import { createSelector } from '@ngrx/store';
import { Project } from '@pt/models';
import { MainViewModel, ProjectHelpers, ScreenSizeColumns } from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectMainViewModel = (
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
) =>
  createSelector(
    ProjectSelectors.selectAll,
    ProjectSelectors.selectSearchInput,
    (projects, searchInput): MainViewModel => {
      let filteredProjects = [...projects];

      // Keyword filter
      if (searchInput.trim() !== '') {
        const keywords = searchInput.toLowerCase().split(' ');
        filteredProjects = filteredProjects.filter((x) => {
          const stringSearch = `${x.name},${
            x.location
          },${ProjectHelpers.getStatusText(x.status)}`.toLowerCase();
          for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];

            if (keyword !== '' && stringSearch.includes(keyword)) return true;
          }

          return false;
        });
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
