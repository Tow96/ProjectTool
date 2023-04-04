// Libraries
import { NgModule } from '@angular/core';
// Modules
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectsRouting } from './projects.routing';
// Data access
import { fromProjects, ProjectApiService, ProjectEffects, ToastEffects } from './data';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalService } from '../core';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRouting,
    StoreModule.forFeature(fromProjects.projectsFeatureKey, fromProjects.reducer),
    EffectsModule.forFeature([ProjectEffects, ToastEffects]),
    MatDialogModule,
  ],
  providers: [ProjectApiService, ModalService],
})
export class ProjectsModule {}
