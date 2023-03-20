import { createSelector } from '@ngrx/store';
import { Project } from '@pt/models';
import { MainViewModel, ScreenSizeColumns } from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectMainViewModel = (
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
) =>
  createSelector(ProjectSelectors.selectAll, (projects): MainViewModel => {
    console.log(ScreenSizeColumns[screenSize]);
    const chunkSize = ScreenSizeColumns[screenSize];
    const chunkedProjects: Project[][] = [];

    for (let i = 0; i < projects.length; i += chunkSize) {
      const chunk = projects.slice(i, i + chunkSize);
      chunkedProjects.push(chunk);
    }

    return {
      projects: chunkedProjects,
    };
  });
