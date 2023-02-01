import { createReducer, on } from '@ngrx/store';
import * as LoadingActions from '../actions/loading.actions';

export const loadingFeatureKey = 'Global_Loading';

export interface State {
  loading: boolean;
}

export const initialState: State = {
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(LoadingActions.showLoading, (state) => ({ ...state, loading: true })),
  on(LoadingActions.hideLoading, (state) => ({ ...state, loading: false }))
);
