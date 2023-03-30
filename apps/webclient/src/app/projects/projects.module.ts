// Libraries
import { NgModule } from '@angular/core';
// Modules
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectsRouting } from './projects.routing';
// Data access
import { fromProjects, ProjectApiService, ProjectEffects, ToastEffects } from './data';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRouting,
    StoreModule.forFeature(fromProjects.projectsFeatureKey, fromProjects.reducer),
    EffectsModule.forFeature([ProjectEffects, ToastEffects]),
  ],
  providers: [ProjectApiService],
})
export class ProjectsModule {}
