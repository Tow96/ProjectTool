// Libraries
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import SharedModule from 'src/app/shared';

// Components
import { NotificationComponent } from './notification.component';

// Services
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, SharedModule],
  providers: [NotificationService],
})
export class NotificationModule {}
