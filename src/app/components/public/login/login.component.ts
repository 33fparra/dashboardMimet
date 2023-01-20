import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   signinForm!: FormGroup;
   loading = false;

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private service: AuthService,
      private snackBar: MatSnackBar
   ) { }

   ngOnInit(): void {
      this.signinForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(6)]],
      });
   }

   get email() {
      return this.signinForm.get('email');
   }

   get password() {
      return this.signinForm.get('password');
   }

   public async signinUser(): Promise<void> {
      this.loading = true;
      const data = this.signinForm.value;
      this.service.login(data).subscribe({
         next: () => {
            this.router.navigate(['/app/rfids-register']);
         },
         error: (error: HttpErrorResponse) => {
            this.loading = false;
            console.log(error);
            this.snackBar.open(
               'Error en las credenciales',
               'Cerrar',
               {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
               }
            );
         }
      })
   }
};
