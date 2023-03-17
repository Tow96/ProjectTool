import { createAction, props } from '@ngrx/store';
import { Project } from '@pt/models';

export const loadProjects = createAction('[Projects Page] Load Projects');

export const loadProjectsCancelled = createAction(
  '[Project Effects] Load Projects Cancelled'
);

export const loadProjectsCached = createAction(
  '[Project Effects] Load Projects Cached'
);

export const loadProjectsSuccess = createAction(
  '[Project Effects] Load Projects Success ',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Project Effects] Load Projects Failure',
  props<{ message: string }>()
);
