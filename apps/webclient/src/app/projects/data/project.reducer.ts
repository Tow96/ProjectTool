import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '@pt/models';
import { ProjectActions } from '.';

export const projectsFeatureKey = 'projects';

export interface State extends EntityState<Project> {
  lastUpdated: Date;
  loaded: boolean;
  loading: boolean;
  searchInput: string;
  formLoading: boolean;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: State = adapter.getInitialState({
  lastUpdated: new Date(0, 0, 0),
  loaded: false,
  loading: false,
  searchInput: '',
  formLoading: false,
});

export const reducer = createReducer(
  initialState,
  // Start loading
  on(ProjectActions.loadProjects, (state) => ({ ...state, loading: true })),
  // Stop loading
  on(
    ProjectActions.loadProjectsCached,
    ProjectActions.loadProjectsCancelled,
    ProjectActions.loadProjectsSuccess,
    ProjectActions.loadProjectsFailure,
    (state) => ({ ...state, loading: false })
  ),
  // Set loaded
  on(ProjectActions.loadProjectsCancelled, ProjectActions.loadProjectsSuccess, (state) => ({
    ...state,
    loaded: true,
  })),
  // Set projects
  on(ProjectActions.loadProjectsSuccess, (state, action) => setProjects(state, action)),
  // Update search form
  on(ProjectActions.updateSearchForm, (state, action) => ({
    ...state,
    searchInput: action.searchInput,
  })),
  // Update a project
  on(ProjectActions.updateProjectSuccess, (state, action) =>
    adapter.updateOne(action.project, state)
  ),
  // Set form loading
  on(ProjectActions.updateProject, (state) => ({ ...state, formLoading: true })),
  // Stop form loading
  on(ProjectActions.updateProjectFailure, ProjectActions.updateProjectSuccess, (state) => ({
    ...state,
    formLoading: false,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

const setProjects = (state: State, action: { projects: Project[] }): State => {
  const newState = adapter.setAll(action.projects, state);

  return {
    ...newState,
    lastUpdated: new Date(),
  };
};
