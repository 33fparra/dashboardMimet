import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

@NgModule({
   declarations: [LoginComponent],
   imports: [
      CommonModule,
      PublicRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class PublicModule {}
