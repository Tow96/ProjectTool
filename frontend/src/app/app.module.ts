// Libraries
import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import CoreModule from '@app/core';

// Components
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/notification/global.error-handler.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, BrowserModule],
  providers: [GlobalErrorHandler], // This is not an error no matter what the lint says
  bootstrap: [AppComponent],
})
export class AppModule {}
