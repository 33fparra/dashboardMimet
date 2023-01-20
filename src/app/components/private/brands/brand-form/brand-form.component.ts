import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BrandsService} from 'src/app/core/services/brands.service';
import {ClientService} from 'src/app/core/services/client.service';
import {IClients} from 'src/app/core/interfaces/client.interface';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styles: [
  ]
})
export class BrandFormComponent implements OnInit {
   dataForm!: FormGroup;
   clients: IClients[] = [];
   actionBtn: string = 'Guardar';
   loading = false;

   constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<BrandFormComponent>,
      private service: BrandsService,
      private serviceClient: ClientService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public editData: any
   ) {}

   ngOnInit(): void {
      this.getClients();

      this.dataForm = this.formBuilder.group({
         name: ['', Validators.required],
         clientId: ['', Validators.required],
      });

      if (this.editData) {
         this.actionBtn = 'Actualizar';
         this.dataForm.controls['name'].setValue(this.editData.name);
         this.dataForm.controls['clientId'].setValue(this.editData.client.id);
      }
   }

   public getClients(){
      this.serviceClient.getActiveClients().subscribe((res) => {
         this.clients = res.data;
      })
   }

   public addItem() {
      if (!this.dataForm.valid) {
         return;
      }

      this.loading = true;
      if (!this.editData) {
         this.service.addBrand(this.dataForm.value).subscribe({
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
      this.service.updateBrand(this.dataForm.value, this.editData.id).subscribe({
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
