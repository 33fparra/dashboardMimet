import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../interfaces/base-response.interface';
import {IUsers} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   constructor(private http: HttpClient) {}

   public getAllUsers() {
      return this.http.get<BaseResponse<IUsers[]>>(`${environment.apiUrl}/users`);
   }

   public getUsersById(id: string) {
      return this.http.get<BaseResponse<IUsers[]>>(`${environment.apiUrl}/users/${id}`);
   }

   public addUser(data: IUsers) {
      return this.http.post<BaseResponse>(`${environment.apiUrl}/users`, data);
   }

   public updateUser(data: IUsers, id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/users/${id}`, data);
   }

   public updateUserStatus(id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/users/${id}/admin/status`, {});
   }

   public deleteUser(id: string) {
      return this.http.delete<BaseResponse>(`${environment.apiUrl}/users/${id}`);
   }
}
