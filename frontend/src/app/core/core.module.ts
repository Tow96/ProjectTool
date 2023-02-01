// Libraries
import { NgModule, isDevMode } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import NotificationModule from './notification';

// NGRX
import { reducers, metaReducers } from './store';
import { ApiService } from './services';
import * as fromLoading from './store/reducers/loading.reducer';
import { LoadingEffects } from './store/effects/loading.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      //traceLimit: 75
    }),
    NotificationModule,
    StoreModule.forFeature(fromLoading.loadingFeatureKey, fromLoading.reducer),
    EffectsModule.forFeature([LoadingEffects]),
  ],
  providers: [ApiService],
})
export default class CoreModule {}
