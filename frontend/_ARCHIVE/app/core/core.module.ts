// Libraries
import { NgModule, isDevMode } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import NotificationModule from '../modules/notification';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

// NGRX
import { ProjectEffects, ProjectReducer, ProjectStore } from './store';

// Services
import { ApiService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

    // NGRX
    StoreModule.forRoot({ [ProjectStore]: ProjectReducer }),
    EffectsModule.forRoot([ProjectEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      //traceLimit: 75
    }),

    // Local Modules
    NotificationModule,
  ],
  providers: [ApiService],
})
export class CoreModule {}
