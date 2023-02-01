import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromProject from '../../modules/project-viewer/state/project.reducer';
import * as fromLoading from './reducers/loading.reducer';

export interface AppState {
  [fromProject.projectsFeatureKey]: fromProject.State;
  [fromLoading.loadingFeatureKey]: fromLoading.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromProject.projectsFeatureKey]: fromProject.reducer,
  [fromLoading.loadingFeatureKey]: fromLoading.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export * as Selectors from './selectors';
