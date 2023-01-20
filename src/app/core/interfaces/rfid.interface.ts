import { Traceable } from './traceable.interface';

export interface IRfid extends Traceable {
   id: string;
   code: string;
   client: {
      id: string;
      name: string;
      phoneNumber: string | null;
      rut: string;
   };
   brand: {
      id: string;
      name: string;
   };
   active: boolean;
   createdAt: number;
   modifiedAt: number;
   deletedAt: number | null;
}

export interface IRfidRegister extends Traceable {
   id: string;
   rfid: string;
   code: string;
   model: string;
   description: string;
   antenna: number;
   device: string;
   createdAt: number;
   modifiedAt: number;
   deletedAt: number | null;
   status: string;
}
