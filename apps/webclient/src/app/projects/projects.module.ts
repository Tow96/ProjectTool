import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRouting } from './projects.routing';
import { StoreModule } from '@ngrx/store';
import { fromProjects } from './data';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRouting,
    StoreModule.forFeature(
      fromProjects.projectsFeatureKey,
      fromProjects.reducer
    ),
  ],
})
export class ProjectsModule {}
