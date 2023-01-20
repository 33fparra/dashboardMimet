import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
   selector: 'app-are-you-sure',
   template: `
      <h3 mat-dialog-title class="text-capitalize">{{ data.title }}</h3>
      <div mat-dialog-content>
         <p class="text-center text-secondary" [innerHTML]="data.message"></p>
      </div>
      <div mat-dialog-actions class="justify-content-center">
         <button mat-button (click)="onNoClick()">Cerrar</button>
         <button
            mat-button
            mat-dialog-close="true"
            *ngIf="data.confirm_message"
         >
            {{ data.confirm_message }}
         </button>
      </div>
   `,
   styles: [],
})
export class AreYouSureComponent implements OnInit {
   constructor(
      private dialogRef: MatDialogRef<AreYouSureComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: { title: string; message: string; confirm_message?: string }
   ) {}

   ngOnInit() {}

   onNoClick() {
      this.dialogRef.close();
   }
}
