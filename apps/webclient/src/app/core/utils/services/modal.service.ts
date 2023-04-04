import { Component, Inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Action, Store } from '@ngrx/store';

interface ModalData {
  title?: string;
  message: string;
  confirm: boolean;
}

@Injectable()
export class ModalService {
  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  openDialog(message: string, title?: string, action?: Action) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && action) {
        this.store.dispatch(action);
      }
    });
  }
}

@Component({
  selector: 'pt-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>{{ data.title || '' }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-flat-button (click)="onCloseClick()">Cancel</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Ok</button>
    </div>
  `,
})
export class ModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: ModalData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
