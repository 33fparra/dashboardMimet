import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {IClients} from 'src/app/core/interfaces/client.interface';
import {ClientService} from 'src/app/core/services/client.service';
import {ClientFormComponent} from './client-form/client-form.component';

@Component({
   selector: 'app-clients',
   templateUrl: './clients.component.html',
   styles: [],
})
export class ClientsComponent implements OnInit {
   public dataSource = new MatTableDataSource<IClients>();
   public loading = true;
   public loadingStatusIds: string[] = [];

   displayedColumns: string[] = [
      'name',
      'phoneNumber',
      'contact',
      'rut',
      'address',
      'active',
      'actions',
   ];

   @ViewChild(MatSort) set sort(sort: MatSort) {
      this.dataSource.sort = sort;
   }

   @ViewChild(MatPaginator) set pag(paginator: MatPaginator) {
      this.dataSource.paginator = paginator;
   }

   constructor(
      public dialog: MatDialog,
      private service: ClientService,
      private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.getAllClients();
   }

   public getAllClients(): void {
      this.service.getAllClients().subscribe((res) => {
         this.dataSource.data = res.data;
         this.loading = false;
      });
   }

   public setLoadingStatus(id: string) {
      this.loadingStatusIds.push(id);
   }

   public unsetLoadingStatus(id: string) {
      const index = this.loadingStatusIds.findIndex((v) => v === id);
      this.loadingStatusIds.splice(index, 1);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   openDialogAdd(): void {
      this.dialog
         .open(ClientFormComponent, {
            width: '30%',
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'save') {
               this.loading = true;
               this.getAllClients();
            }
         });
   }

   openDialogEdit(element?: IClients): void {
      this.dialog
         .open(ClientFormComponent, {
            width: '30%',
            data: element,
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'update') {
               this.loading = true;
               this.getAllClients();
            }
         });
   }

   public delete(item: IClients) {
      this.loading = true;
      this.service.deleteClient(item.id).subscribe({
         next: (res) => {
            this.snackBar.open(res.description, '', {
               duration: 2000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
            });

            if (res.status) {
               this.getAllClients();
            } else {
               this.loading = false;
            }
         },
         error: () => {
            this.loading = false;
            this.snackBar.open(
               'Ocurrió un error en eliminar el item',
               'Cerrar',
               {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
               }
            );
         },
      });
   }

   public onStatusChange(id: string) {
      this.setLoadingStatus(id);
      this.service.updateClientStatus(id).subscribe((res) => {
         this.snackBar.open('Estado actualizado', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
         });

         this.unsetLoadingStatus(id);
      });
   }
}
