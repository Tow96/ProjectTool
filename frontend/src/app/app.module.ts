// Libraries
import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import CoreModule from './core';

// Components
import { AppComponent } from './app.component';

// Services
import { GlobalErrorHandler } from './modules/notification';
import SharedModule from './shared';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [AppComponent, ProjectCardComponent],
  imports: [CoreModule, SharedModule, BrowserModule],
  providers: [GlobalErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
