// Libraries
import { NgModule, isDevMode } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import NotificationModule from './notification';

// NGRX
import { reducers, metaReducers } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      //traceLimit: 75
    }),
    NotificationModule,
  ],
})
export default class CoreModule {}
