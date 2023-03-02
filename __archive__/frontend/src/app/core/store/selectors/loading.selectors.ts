import { createFeatureSelector } from '@ngrx/store';
import * as fromLoading from '../reducers/loading.reducer';

export const selectLoadingState = createFeatureSelector<fromLoading.State>(
  fromLoading.loadingFeatureKey
);
