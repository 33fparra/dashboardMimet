import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {IBrands} from 'src/app/core/interfaces/brand.interface';
import {BrandsService} from 'src/app/core/services/brands.service';
import {BrandFormComponent} from './brand-form/brand-form.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styles: [
  ]
})
export class BrandsComponent implements OnInit {
   public dataSource = new MatTableDataSource<IBrands>();
   public loading = true;
   public loadingStatusIds: string[] = [];

   displayedColumns: string[] = [
      'name',
      'client.name',
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
      private service: BrandsService,
      private snackBar: MatSnackBar,
   ) {}

   ngOnInit(): void {
      this.getAllBrands();
   }

   public getAllBrands(): void {
      this.service.getAllBrands().subscribe((res) => {
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
         .open(BrandFormComponent, {
            width: '30%',
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'save') {
               this.loading = true;
               this.getAllBrands();
            }
         });
   }

   openDialogEdit(element?: IBrands): void {
      this.dialog
         .open(BrandFormComponent, {
            width: '30%',
            data: element,
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'update') {
               this.loading = true;
               this.getAllBrands();
            }
         });
   }

   public delete(item: IBrands) {
      this.loading = true;
      this.service.deleteBrand(item.id).subscribe({
         next: (res) => {
            this.snackBar.open(res.description, '', {
               duration: 2000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
            });

            if (res.status) {
               this.getAllBrands();
            } else {
               this.loading = false;
            }
         },
         error: () => {
            this.loading = false;
            this.showAlert('Ocurrió un error en eliminar el item', 10000, 'Cerrar');
         },
      });
   }

   public onStatusChange(id: string) {
      this.setLoadingStatus(id);
      this.service.updateBrandStatus(id).subscribe((res) => {
         this.showAlert('Estado actualizado', 1500)
         this.unsetLoadingStatus(id);
      });
   }

   showAlert(message: string, time: number, buttonTitle?: string) {
      this.snackBar.open(message, buttonTitle, {
         duration: time,
         horizontalPosition: 'center',
         verticalPosition: 'top',
      });
   }
}
