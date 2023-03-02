import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectViewerComponent } from './project-viewer.component';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './state/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';
import { ProjectViewerService } from './project-viewer.service';
import SharedModule from '@app/shared';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [ProjectViewerComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromProject.projectsFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
  exports: [ProjectViewerComponent],
  providers: [ProjectViewerService],
})
export default class ProjectViewerModule {}
