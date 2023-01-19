import { Component, Input, Type } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  template: `
    <h4 mat-dialog-title>{{ title }}</h4>
    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>
    <div mat-dialog-actions>
      <button
        mat-flat-button
        mat-dialog-close="Closed"
        [color]="type"
        cdkFocusInitial
      >
        Close
      </button>
    </div>
  `,
})
export class NotificationComponent {
  @Input() title = 'Notification';
  @Input() message = 'Message';
  @Type() type: 'basic' | 'primary' | 'accent' | 'warn' = 'primary';

  constructor(
    private readonly dialogRef: MatDialogRef<NotificationComponent>
  ) {}
}
