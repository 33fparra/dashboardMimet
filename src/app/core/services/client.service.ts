import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../interfaces/base-response.interface';
import { IClients } from '../interfaces/client.interface';

@Injectable({
   providedIn: 'root',
})
export class ClientService {
   constructor(private http: HttpClient) { }

   public getAllClients() {
      return this.http.get<BaseResponse<IClients[]>>(`${environment.apiUrl}/customers`);
   }

   public getActiveClients() {
      return this.http.get<BaseResponse<IClients[]>>(`${environment.apiUrl}/customers/active`);
   }

   public addClient(data: IClients) {
      return this.http.post<BaseResponse>(`${environment.apiUrl}/customers`, data);
   }

   public updateClient(data: IClients, id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/customers/${id}`, data);
   }

   public updateClientStatus(id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/customers/${id}/admin/status`, {});
   }

   public deleteClient(id: string) {
      return this.http.delete<BaseResponse>(`${environment.apiUrl}/customers/${id}`);
   }
}
