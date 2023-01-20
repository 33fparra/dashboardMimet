import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {IRfid} from 'src/app/core/interfaces/rfid.interface';
import {RfidsService} from 'src/app/core/services/rfids.service';
import {RfidFormComponent} from './rfid-form/rfid-form.component';

@Component({
  selector: 'app-rfids',
  templateUrl: './rfids.component.html',
  styles: [
  ]
})
export class RfidsComponent implements OnInit {
   public dataSource = new MatTableDataSource<IRfid>();
   public loadingStatusIds: string[] = [];
   public loading = true;

   displayedColumns: string[] = [
      'code',
      'client.name',
      'brand.name',
      'active',
      'actions'
   ];

   @ViewChild(MatSort) set sort(sort: MatSort) {
      this.dataSource.sort = sort;
   }

   @ViewChild(MatPaginator) set pag(paginator: MatPaginator) {
      this.dataSource.paginator = paginator;
   }

   constructor(
      public dialog: MatDialog,
      private service: RfidsService,
      private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.getAllRfids();
   }

   public getAllRfids(): void {
      this.service.getAllRfids().subscribe((res) => {
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
         .open(RfidFormComponent, {
            width: '30%',
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'save') {
               this.loading = true;
               this.getAllRfids();
            }
         });
   }

   openDialogEdit(element?: IRfid): void {
      this.dialog
         .open(RfidFormComponent, {
            width: '30%',
            data: element,
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'update') {
               this.loading = true;
               this.getAllRfids();
            }
         });
   }

   public delete(item: IRfid) {
      this.loading = true;
      this.service.deleteRfid(item.id).subscribe({
         next: (res) => {
            this.snackBar.open(res.description, '', {
               duration: 2000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
            });

            if (res.status) {
               this.getAllRfids();
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
      this.service.updateRfidStatus(id).subscribe((res) => {
         this.snackBar.open('Estado actualizado', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
         });

         this.unsetLoadingStatus(id);
      });
   }
}
