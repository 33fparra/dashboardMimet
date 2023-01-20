import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {IClients} from 'src/app/core/interfaces/client.interface';
import {UsersService} from 'src/app/core/services/users.service';
import {ClientService} from 'src/app/core/services/client.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {
   dataForm!: FormGroup;
   clients: IClients[] = [];
   actionBtn: string = 'Guardar';
   public showClientList!: boolean;
   loading = false;
   hide = true;

   constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<UserFormComponent>,
      private service: UsersService,
      private serviceClient: ClientService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public editData: any
   ) {}

   ngOnInit(): void {
      this.getClients();

      this.dataForm = this.formBuilder.group({
         fullname: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required],
         role: ['', Validators.required],
         clientId: [''],
      });

      if (this.editData) {
         this.actionBtn = 'Actualizar';
         this.dataForm.controls['fullname'].setValue(this.editData.fullname);
         this.dataForm.controls['email'].setValue(this.editData.email);
         this.dataForm.controls['role'].setValue(this.editData.role);
         this.dataForm.controls['clientId'].setValue(this.editData.client.id);
      }

      this.showClientList = this.dataForm.value.role === 'client';
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

      if (this.showClientList && !this.dataForm.value.clientId) {
         return;
      }

      this.loading = true;
      if (!this.editData) {
         this.service.addUser(this.dataForm.value).subscribe({
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
      this.service.updateUser(this.dataForm.value, this.editData.id).subscribe({
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
      this.showClientList = this.dataForm.value.role === 'client';
   }
}
