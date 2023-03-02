// Libraries
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../store';

// Components
import NotificationComponent, { ClosedStates } from './notification.component';

@Injectable()
export default class NotificationService {
  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  private openDialog(
    message: string,
    title: string,
    type: 'basic' | 'primary' | 'accent' | 'warn' = 'primary',
    next: Action | undefined = undefined
  ): void {
    const modalRef = this.dialog.open(NotificationComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.next = !(next === undefined);

    modalRef.afterClosed().subscribe((res) => {
      if (res === ClosedStates.Next && next) {
        this.store.dispatch(next);
      }
    });
  }

  info(
    message: string,
    title = 'Notification',
    next: Action | undefined = undefined
  ) {
    this.openDialog(message, title, 'accent', next);
  }

  warning(
    message: string,
    title = 'Warning',
    next: Action | undefined = undefined
  ) {
    this.openDialog(message, title, 'primary', next);
  }

  error(
    message: string,
    title = 'Error',
    next: Action | undefined = undefined
  ) {
    this.openDialog(message, title, 'warn', next);
  }
}
