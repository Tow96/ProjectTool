// Libraries
import { NgModule } from '@angular/core';
// Modules
import SharedModule from '@app/shared';
// Components
import NotificationComponent from './notification.component';
// Services
import NotificationService from './notification.service';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './effects/notification.effects';

@NgModule({
  declarations: [NotificationComponent],
  imports: [SharedModule, EffectsModule.forFeature([NotificationEffects])],
  providers: [NotificationService],
})
export default class NotificationModule {}
