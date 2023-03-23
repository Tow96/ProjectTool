import { createSelector } from '@ngrx/store';
import { Project } from '@pt/models';
import { MainViewModel, ScreenSizeColumns } from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectMainViewModel = (
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
) =>
  createSelector(
    ProjectSelectors.selectAll,
    ProjectSelectors.selectSearchInput,
    (projects, searchInput): MainViewModel => {
      const keywords = searchInput.toLowerCase().split(' ');
      const filteredProjects: Project[] = [];
      projects.forEach((x) => {
        const stringSearch = `${x.name},${x.location}`.toLowerCase();
        for (let i = 0; i < keywords.length; i++) {
          if (stringSearch.includes(keywords[i])) {
            filteredProjects.push(x);
            break;
          }
        }
      });

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
