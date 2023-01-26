import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import MaterialModule from './material';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [CommonModule, MaterialModule],
})
export default class SharedModule {}
