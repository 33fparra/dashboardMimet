import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {IUsers} from 'src/app/core/interfaces/user.interface';
import {UsersService} from 'src/app/core/services/users.service';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserFormComponent} from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
   public dataSource = new MatTableDataSource<IUsers>();
   public loadingStatusIds: string[] = [];
   public loading = true;

   displayedColumns: string[] = [
      'fullname',
      'clientName',
      'email',
      'role',
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
      private service: UsersService,
      private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.getAllUsers();
   }

   public getAllUsers(): void {
      this.service.getAllUsers().subscribe((res) => {
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
         .open(UserFormComponent, {
            width: '30%',
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'save') {
               this.loading = true;
               this.getAllUsers();
            }
         });
   }

   openDialogEdit(element?: IUsers): void {
      this.dialog
         .open(UserEditComponent, {
            width: '30%',
            data: element,
         })
         .afterClosed()
         .subscribe((val) => {
            if (val === 'update') {
               this.loading = true;
               this.getAllUsers();
            }
         });
   }

   public delete(item: IUsers) {
      this.loading = true;
      this.service.deleteUser(item.id).subscribe({
         next: (res) => {
            this.snackBar.open(res.description, '', {
               duration: 2000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
            });

            if (res.status) {
               this.getAllUsers();
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
      this.service.updateUserStatus(id).subscribe((res) => {
         this.snackBar.open('Estado actualizado', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
         });

         this.unsetLoadingStatus(id);
      });
   }
}
