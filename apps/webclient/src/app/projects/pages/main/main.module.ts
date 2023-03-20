// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Modules
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
// Components
import { MainComponent } from './main.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToolBarComponent } from '../../../core';
import { ProjectcardComponent } from '../../components';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    CommonModule,
    ScrollingModule,
    ProjectcardComponent,

    MatFormFieldModule,
    MatInputModule,

    ToolBarComponent,
  ],
})
export class MainModule {}
