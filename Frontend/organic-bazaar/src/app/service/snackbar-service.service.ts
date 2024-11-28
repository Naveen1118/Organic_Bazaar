import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }
  snackbarDisplay(message: any) {
    this.snackBar.open(message, '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'center',
      });
  }
}