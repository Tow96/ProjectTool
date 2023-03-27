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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
    ProjectcardComponent,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    ToolBarComponent,
  ],
})
export class MainModule {}
