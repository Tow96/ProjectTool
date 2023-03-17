// Libraries
import { enableProdMode, isDevMode, NgModule } from '@angular/core';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler, StyleManagerService, ToastService } from './utils';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';

let devModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
  }),
];

if (environment.production) {
  devModules = [];
  enableProdMode();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Global modules
    MatSnackBarModule,

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
  ],
  providers: [ToastService, StyleManagerService, GlobalErrorHandler],
})
export class CoreModule {}
