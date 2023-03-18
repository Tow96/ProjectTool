// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Modules
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// Components
import { MainComponent } from './main.component';
import { ProjectcardComponent } from '../../components/projectcard/projectcard.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ToolBarComponent } from '../../../core';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    CommonModule,
    FlexLayoutModule,
    ProjectcardComponent,

    MatCardModule,
    MatButtonModule,

    ToolBarComponent,
  ],
})
export class MainModule {}
