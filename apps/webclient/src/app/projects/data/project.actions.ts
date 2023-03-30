import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { EditProject, Project } from '@pt/models';

export const loadProjects = createAction('[Projects Page] Load Projects');

export const loadProjectsCancelled = createAction('[Project Effects] Load Projects Cancelled');

export const loadProjectsCached = createAction('[Project Effects] Load Projects Cached');

export const loadProjectsSuccess = createAction(
  '[Project Effects] Load Projects Success ',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Project Effects] Load Projects Failure',
  props<{ message: string }>()
);

export const updateProject = createAction(
  '[Project Form] Update Project',
  props<{ id: number; changes: EditProject }>()
);

export const updateProjectSuccess = createAction(
  '[Project Effects] Update Project Success',
  props<{ project: Update<Project> }>()
);

export const updateProjectFailure = createAction(
  '[Project Effects] Update Project Failure',
  props<{ message: string }>()
);

export const updateSearchForm = createAction(
  '[Projects Page] Update Search Form',
  props<{ searchInput: string }>()
);
