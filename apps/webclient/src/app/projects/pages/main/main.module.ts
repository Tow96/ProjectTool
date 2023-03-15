// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modules
import { RouterModule } from '@angular/router';
// Components
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    CommonModule,
  ],
})
export class MainModule {}
