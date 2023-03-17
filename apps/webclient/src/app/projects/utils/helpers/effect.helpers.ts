import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ProjectActions } from '../../data';

export class EffectHelpers {
  validateProjectCache(cache: Date, store: Store): boolean {
    const cacheLongevity = 10 * 60 * 1000; // 10min in ms

    const compareDate = new Date();
    if (compareDate.getTime() - cache.getTime() < cacheLongevity) {
      console.log(`Using projects in cache`);
      store.dispatch(ProjectActions.loadProjectsCached());
      return false;
    }

    return true;
  }

  /*eslint-disable @typescript-eslint/no-explicit-any*/
  getProjectsFailurePipe(e: any): Observable<Action> {
    return of(
      ProjectActions.loadProjectsFailure({
        message: e.message || 'Failed loading projects',
      })
    );
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
}
