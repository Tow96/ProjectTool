import { ErrorHandler, Injectable, Provider } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private readonly toast: ToastService) {}

  handleError(error: any): void {
    console.error(error);

    // Gets the message depending if the error is sync or async:
    if (error.rejection) error = error.rejection;

    this.toast.warn(
      error.message || 'No message provided, see console for details.'
    );
  }
}

export const GlobalErrorHandler: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandlerService,
};
