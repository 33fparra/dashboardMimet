import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../interfaces/base-response.interface';
import { IRfid, IRfidRegister } from '../interfaces/rfid.interface';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
   providedIn: 'root'
})
export class RfidsService {
   constructor(private http: HttpClient, private afs:AngularFirestore) { }

   public getAllRfids() {
      return this.http.get<BaseResponse<IRfid[]>>(`${environment.apiUrl}/rfid`);
   }

   public addRfid(data: IRfid) {
      return this.http.post<BaseResponse>(`${environment.apiUrl}/rfid`, data);
   }

   public updateRfid(data: IRfid, id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/rfid/${id}`, data);
   }

   public updateRfidStatus(id: string) {
      return this.http.put<BaseResponse>(`${environment.apiUrl}/rfid/${id}/admin/status`, {});
   }

   public deleteRfid(id: string) {
      return this.http.delete<BaseResponse>(`${environment.apiUrl}/rfid/${id}`);
   }

   public getRegisterRfidList() {
      return this.http.get<BaseResponse<IRfidRegister[]>>(`${environment.apiUrl}/rfid/register/list`);
   }

   public getItems(): Observable<IRfidRegister[]> {
      const items = this.afs.collection('rfid-reader', ref => ref.orderBy('createdAt','desc')).valueChanges() as Observable<IRfidRegister[]>;
      return items;
   }
}
