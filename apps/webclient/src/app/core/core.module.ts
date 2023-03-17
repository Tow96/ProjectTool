// Libraries
import { isDevMode, NgModule } from '@angular/core';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler, StyleManagerService, ToastService } from './utils';

const devModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
  }),
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NGRX
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictStateImmutability: true,
          // strictStateSerializability: true,
          strictActionImmutability: true,
          // strictActionSerializability: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    // dev modules
    ...devModules,

    MatSnackBarModule,
  ],
  providers: [ToastService, StyleManagerService, GlobalErrorHandler],
})
export class CoreModule {}
