import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../interfaces/base-response.interface';
import {IPortics} from '../interfaces/portics.interface';

@Injectable({
  providedIn: 'root'
})
export class PorticsService {
   constructor(private http: HttpClient) {}

   public getAllPortics() {
      return this.http.get<BaseResponse<IPortics[]>>(`${environment.apiUrl}/portics`);
   }

   public addPortic(data: IPortics) {
      return this.http.post<BaseResponse>(`${environment.apiUrl}/portics`, data);
   }

   public updatePortic(data: IPortics, id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/portics/${id}`, data);
   }

   public updatePorticStatus(id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/portics/${id}/admin/status`, {});
   }

   public deletePortic(id: string) {
      return this.http.delete<BaseResponse>(`${environment.apiUrl}/portics/${id}`);
   }
}
