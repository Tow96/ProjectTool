import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export enum ClosedStates {
  Exitted = 'CloseBttn',
  Next = 'NextBttn',
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export default class NotificationComponent {
  @Input() title = 'Notification';
  @Input() message = 'Message';
  @Input() type: 'basic' | 'primary' | 'accent' | 'warn' = 'primary';
  @Input() next = false;

  readonly closeStates = ClosedStates;

  constructor(
    private readonly dialogRef: MatDialogRef<NotificationComponent>
  ) {}
}
