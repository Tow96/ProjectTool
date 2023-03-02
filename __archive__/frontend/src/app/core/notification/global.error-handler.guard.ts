import { ErrorHandler, Injectable, Injector, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import NotificationComponent from './notification.component';

@Injectable()
class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  /* eslint-disable @typescript-eslint/no-explicit-any */
  handleError(error: any): void {
    console.error(error);

    // Gets the message depending if the error is sync or async:
    if (error.rejection) error = error.rejection;

    const notificationService = this.injector.get(MatDialog);

    const dialogRef = notificationService.open(NotificationComponent);
    dialogRef.componentInstance.title = 'Error';
    dialogRef.componentInstance.type = 'warn';
    dialogRef.componentInstance.message = error.message
      ? error.message.toString()
      : 'No message provided, see console for details.';
  }
}

export const GlobalErrorHandler: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandlerService,
};
