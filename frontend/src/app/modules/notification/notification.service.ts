import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from './notification.component';

@Injectable()
export class NotificationService {
  constructor(public dialog: MatDialog) {}

  private openDialog(
    message: string,
    title: string,
    type: 'basic' | 'primary' | 'accent' | 'warn' = 'primary'
  ): void {
    const modalRef = this.dialog.open(NotificationComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
  }

  info(message: string, title = 'Notification') {
    this.openDialog(message, title, 'accent');
  }

  warning(message: string, title = 'Warning') {
    this.openDialog(message, title, 'primary');
  }

  error(message: string, title = 'Error') {
    this.openDialog(message, title, 'warn');
  }
}
