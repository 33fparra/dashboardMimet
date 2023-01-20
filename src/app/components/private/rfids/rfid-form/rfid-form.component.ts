import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {IClients} from 'src/app/core/interfaces/client.interface';
import {IBrands} from 'src/app/core/interfaces/brand.interface';
import {RfidsService} from 'src/app/core/services/rfids.service';
import {BrandsService} from 'src/app/core/services/brands.service';
import {ClientService} from 'src/app/core/services/client.service';

@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styles: [
  ]
})
export class RfidFormComponent implements OnInit {
   dataForm!: FormGroup;
   clients: IClients[] = [];
   brands: IBrands[] = [];
   actionBtn: string = 'Guardar';
   loading = false;

   constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<RfidFormComponent>,
      private service: RfidsService,
      private serviceBrand: BrandsService,
      private serviceClient: ClientService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public editData: any
   ) {}

   ngOnInit(): void {
      this.getClients();

      this.dataForm = this.formBuilder.group({
         code: ['', Validators.required],
         clientId: ['', Validators.required],
         brandId: ['', Validators.required],
      });

      if (this.editData) {
         this.actionBtn = 'Actualizar';
         this.dataForm.controls['code'].setValue(this.editData.code);
         this.dataForm.controls['clientId'].setValue(this.editData.client.id);
         this.dataForm.controls['brandId'].setValue(this.editData.brand.id);

         this.getBrandsById(this.editData.client.id);
      }
   }

   public getClients(){
      this.serviceClient.getAllClients().subscribe((res) => {
         this.clients = res.data;
      })
   }

   public getBrandsById(id: string){
      this.serviceBrand.getBrandsByIdAngType(id, 'active').subscribe((res) => {
         this.brands = res.data;
      })
   }

   public addItem() {
      if (!this.dataForm.valid) {
         return;
      }

      this.loading = true;
      if (!this.editData) {
         this.service.addRfid(this.dataForm.value).subscribe({
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
      this.service.updateRfid(this.dataForm.value, this.editData.id).subscribe({
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

   public onChange(){
      this.getBrandsById(this.dataForm.value.clientId);
   }
}
