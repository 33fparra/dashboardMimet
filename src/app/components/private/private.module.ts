import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrandsComponent } from './brands/brands.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { BrandFormComponent } from './brands/brand-form/brand-form.component';
import { PorticsComponent } from './portics/portics.component';
import { PorticFormComponent } from './portics/portic-form/portic-form.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { RfidFormComponent } from './rfids/rfid-form/rfid-form.component';
import { CoolerFormComponent } from './coolers/cooler-form/cooler-form.component';
import { CoolersComponent } from './coolers/coolers.component';
import { RfidsComponent } from './rfids/rfids.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RfidRegisterComponent } from './rfid-register/rfid-register.component';
import { MomentFormatPipe } from 'src/app/core/pipes/moment-format.pipe';

@NgModule({
   declarations: [
      ClientsComponent,
      NavigationComponent,
      BrandsComponent,
      DashboardComponent,
      ClientFormComponent,
      LoadingSpinnerComponent,
      BrandFormComponent,
      PorticsComponent,
      PorticFormComponent,
      UserFormComponent,
      RfidFormComponent,
      RfidRegisterComponent,
      CoolerFormComponent,
      CoolersComponent,
      RfidsComponent,
      UsersComponent,
      UserEditComponent,
      MomentFormatPipe
   ],
   imports: [
      CommonModule,
      PrivateRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class PrivateModule { }
