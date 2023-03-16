// Libraries
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToastService {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  private openSnackBar(message: string, style = 'basic-snackbar') {
    this.matSnackBar.open(message, undefined, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [style],
    });
  }

  accent(msg: string) {
    this.openSnackBar(msg, 'accent-snackbar');
  }

  basic(msg: string) {
    this.openSnackBar(msg, 'basic-snackbar');
  }

  primary(msg: string) {
    this.openSnackBar(msg, 'primary-snackbar');
  }

  warn(msg: string) {
    this.openSnackBar(msg, 'warn-snackbar');
  }
}
