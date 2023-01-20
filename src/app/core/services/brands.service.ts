import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../interfaces/base-response.interface';
import {IBrands} from '../interfaces/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
   constructor(private http: HttpClient) {}

   public getAllBrands() {
      return this.http.get<BaseResponse<IBrands[]>>(`${environment.apiUrl}/brand`);
   }

   public getActiveBrands() {
      return this.http.get<BaseResponse<IBrands[]>>(`${environment.apiUrl}/brand/active`);
   }

   public getBrandsByIdAngType(id: string, type: string = 'all') {
      return this.http.get<BaseResponse<IBrands[]>>(`${environment.apiUrl}/brand/${id}/type/${type}`);
   }

   public addBrand(data: IBrands) {
      return this.http.post<BaseResponse>(`${environment.apiUrl}/brand`, data);
   }

   public updateBrand(data: IBrands, id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/brand/${id}`, data);
   }

   public updateBrandStatus(id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/brand/${id}/admin/status`, {});
   }

   public deleteBrand(id: string) {
      return this.http.delete<BaseResponse>(`${environment.apiUrl}/brand/${id}`);
   }
}
