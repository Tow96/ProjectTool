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
  // (Create) Add project
  on(ProjectActions.createProjectSuccess, (state, action) => addProject(state, action)),
  // (Read) Set projects
  on(ProjectActions.loadProjectsSuccess, (state, action) => setProjects(state, action)),
  // (Update) a project
  on(ProjectActions.updateProjectSuccess, (state, action) =>
    adapter.updateOne(action.project, state)
  ),
  // (Delete) remove project
  on(ProjectActions.deleteProjectSuccess, (state, action) => adapter.removeOne(action.id, state)),
  // Update search form
  on(ProjectActions.updateSearchForm, (state, action) => ({
    ...state,
    searchInput: action.searchInput,
  })),
  // Set form loading
  on(
    ProjectActions.createProject,
    ProjectActions.updateProject,
    ProjectActions.deleteProject,
    (state) => ({
      ...state,
      formLoading: true,
    })
  ),
  // Stop form loading
  on(
    ProjectActions.createProjectFailure,
    ProjectActions.createProjectSuccess,
    ProjectActions.deleteProjectFailure,
    ProjectActions.deleteProjectSuccess,
    ProjectActions.updateProjectFailure,
    ProjectActions.updateProjectSuccess,
    (state) => ({
      ...state,
      formLoading: false,
    })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

const addProject = (state: State, { project }: { project: Project }): State => {
  let newState = state;
  const prevProject = selectAll(state).find((x) => x.location === project.location);

  if (prevProject) newState = adapter.removeOne(prevProject.id, newState);

  return adapter.addOne(project, newState);
};

const setProjects = (state: State, action: { projects: Project[] }): State => {
  const newState = adapter.setAll(action.projects, state);

  return {
    ...newState,
    lastUpdated: new Date(),
  };
};
