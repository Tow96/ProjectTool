import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { CreateProject, EditProject, Project } from '@pt/models';

// Load ----------------------------------------------------------------
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

// Create --------------------------------------------------------------
export const createProject = createAction(
  '[Project Form] Create Project',
  props<{ project: CreateProject; img?: File }>()
);

export const createProjectSuccess = createAction(
  '[Project Effects] Create Project Success',
  props<{ project: Project }>()
);

export const createProjectFailure = createAction(
  '[Project Effects] Create Projects Failure',
  props<{ message: string }>()
);

// Update --------------------------------------------------------------
export const updateProject = createAction(
  '[Project Form] Update Project',
  props<{ id: number; changes: EditProject; img?: File }>()
);

export const updateProjectSuccess = createAction(
  '[Project Effects] Update Project Success',
  props<{ project: Update<Project> }>()
);

export const updateProjectFailure = createAction(
  '[Project Effects] Update Project Failure',
  props<{ message: string }>()
);

// Delete --------------------------------------------------------------
export const deleteProject = createAction('[Project Form] Delete Project', props<{ id: number }>());

export const deleteProjectSuccess = createAction(
  '[Project Effects] Delete Project Success',
  props<{ id: number }>()
);

export const deleteProjectFailure = createAction(
  '[Project Effects] Delete Project Failure',
  props<{ message: string }>()
);

// Search Form ---------------------------------------------------------
export const updateSearchForm = createAction(
  '[Projects Page] Update Search Form',
  props<{ searchInput: string }>()
);
