import { Store } from '@ngrx/store';

export class EffectHelpers {
  validateProjectCache(cache: Date, store: Store): boolean {
    const cacheLongevity = 10 * 60 * 1000; // 10min in ms

    const compareDate = new Date();
    if (compareDate.getTime() - cache.getTime() < cacheLongevity) {
      console.log(`Using projects in cache`);
      return false;
    }

    return true;
  }
}
