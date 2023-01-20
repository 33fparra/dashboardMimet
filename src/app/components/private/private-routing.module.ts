import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { ClientsComponent } from './clients/clients.component';
import { CoolersComponent } from './coolers/coolers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PorticsComponent } from './portics/portics.component';
import { RfidRegisterComponent } from './rfid-register/rfid-register.component';
import { RfidsComponent } from './rfids/rfids.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
   {
      path: '',
      component: NavigationComponent,
      children: [
         {
            path: '',
            redirectTo: 'navigation',
            pathMatch: 'full'
         },
         {
            path: 'dashboard',
            component: DashboardComponent,
         },
         {
            path: 'customers',
            component: ClientsComponent,
         },
         {
            path: 'brands',
            component: BrandsComponent,
         },
         {
            path: 'portics',
            component: PorticsComponent,
         },
         {
            path: 'rfids',
            component: RfidsComponent,
         },
         {
            path: 'rfids-register',
            component: RfidRegisterComponent,
         },
         {
            path: 'coolers',
            component: CoolersComponent,
         },
         {
            path: 'users',
            component: UsersComponent,
         },
      ],
   },
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PrivateRoutingModule { }
