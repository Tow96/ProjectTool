// Libraries
import { enableProdMode, isDevMode, NgModule } from '@angular/core';
// Modules
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Services
import { GlobalErrorHandler, StyleManagerService, ToastService } from './utils';
// Misc.
import { environment } from '../../environments/environment';
import { fromTheme } from './data';
import { ThemeEffects } from './data/effects';

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
      {
        [fromTheme.featureKey]: fromTheme.reducer,
      },
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
    EffectsModule.forRoot([ThemeEffects]),
    // dev modules
    ...devModules,
  ],
  providers: [ToastService, StyleManagerService, GlobalErrorHandler],
})
export class CoreModule {}
