import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from "rxjs/operators";
import * as moment from 'moment';
import { IUsers } from '../interfaces/user.interface';
import { UserSession } from '../exportables/models/user-session.mode';
import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';


interface LoginResponse {
   accessToken: string;
   expiresIn: 1630360372;
   user: IUsers;
}

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private storage = sessionStorage;
   userSessionSource: BehaviorSubject<UserSession> = new BehaviorSubject<UserSession>({
      id: "",
      fullname: "",
      email: "",
      role: "",
      active: false,
      clientId: "",
      clientName: "",
      clientRut: "",
      createdAt: 0,
      modifiedAt: 0,
      deletedAt: 0
   });

   get userSessionSync() {
      return this.userSessionSource.getValue();
   }

   get userSessionRole() {
      return this.userSessionSync.role;
   }

   constructor(private http: HttpClient, private router: Router) {}

   getUserSession() {
      return this.http
         .get<IUsers>(`${environment.apiUrl}/auth/session`)
         .pipe(
            tap((user: IUsers) => {
               if (!user) throw new Error('Sesión expirada');
               this.userSessionSource.next(plainToClass(UserSession, user));
            }),
         );
   }

   isAuthorized(): Observable<boolean> {
      const expiresIn = this.storage.getItem(environment.expKey);
      const token = this.storage.getItem(environment.tokenKey);

      if (!token || !expiresIn) {
         return of(false);
      }

      const expiresInMoment = moment.unix(Number(expiresIn));
      if (!expiresInMoment.isValid()) {
         return of(false);
      }

      const isAuthorized: boolean = moment().isBefore(expiresInMoment);
      return of(isAuthorized);
   }

   getAccessToken(): Observable<string> {
      return of(this.storage.getItem(environment.tokenKey) as string);
   }

   clearStorage() {
      this.storage.clear();
      this.userSessionSource.next({
         id: "",
         fullname: "",
         email: "",
         role: "",
         active: false,
         clientId: "",
         clientName: "",
         clientRut: "",
         createdAt: 0,
         modifiedAt: 0,
         deletedAt: 0
      });
   }

   refreshToken(): Observable<any> {
      return of(undefined);
   }

   logout() {
      this.clearStorage();
      this.router.navigate(['/public/auth/login']);
   }

   login(data: { email: string; password: string }) {
      return this.http
         .post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
         .pipe(
            tap((response) => {
               this.storage.setItem(environment.tokenKey, response.accessToken);
               this.storage.setItem(
                  environment.expKey,
                  response.expiresIn.toString()
               );
            }),
            tap((response) => {
               const user = response.user;
               if (!user) throw new Error('Sesión expirada');
               this.userSessionSource.next(plainToClass(UserSession, user));
            })
         );
   }
}
