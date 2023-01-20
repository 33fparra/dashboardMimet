import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PorticsService} from 'src/app/core/services/portics.service';

@Component({
  selector: 'app-portic-form',
  templateUrl: './portic-form.component.html',
  styles: [
  ]
})
export class PorticFormComponent implements OnInit {
   dataForm!: FormGroup;
   actionBtn: string = 'Guardar';
   loading = false;

   constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<PorticFormComponent>,
      private service: PorticsService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public editData: any
   ) {}

   ngOnInit(): void {
      this.dataForm = this.formBuilder.group({
         code: ['', Validators.required],
         address: ['', Validators.required],
      });

      if (this.editData) {
         this.actionBtn = 'Actualizar';
         this.dataForm.controls['code'].setValue(this.editData.code);
         this.dataForm.controls['address'].setValue(this.editData.address);
      }
   }

   public addItem() {
      if (!this.dataForm.valid) {
         return;
      }

      this.loading = true;
      if (!this.editData) {
         this.service.addPortic(this.dataForm.value).subscribe({
            next: (res) => {
               this.snackBar.open(res.description, '', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
               });

               if (res.status) {
                  this.dataForm.reset();
                  this.dialogRef.close('save');
               } else {
                  this.loading = false;
               }
            },
            error: () => {
               this.loading = false;
               this.snackBar.open(
                  'Ocurrió un error en el ingreso del item',
                  'Cerrar',
                  {
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                  }
               );
            },
         });
      } else {
         this.updateItem();
      }
   }

   public updateItem() {
      if (!this.dataForm.valid) {
         return;
      }

      this.loading = true;
      this.service.updatePortic(this.dataForm.value, this.editData.id).subscribe({
         next: (res) => {
            this.snackBar.open(res.description, '', {
               duration: 2000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
            });

            if (res.status) {
               this.dataForm.reset();
               this.dialogRef.close('update');
            } else {
               this.loading = false;
            }
         },
         error: () => {
            this.loading = false;
            this.snackBar.open(
               'Ocurrió un error en al actualizar del item',
               'Cerrar',
               {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
               }
            );
         },
      });
   }
}
