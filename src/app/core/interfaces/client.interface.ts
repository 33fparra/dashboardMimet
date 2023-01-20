import { Traceable } from './traceable.interface';

export interface IClients extends Traceable {
   active: boolean;
   contact: string;
   createdAt: number;
   deletedAt: number | null;
   id: string;
   modifiedAt: number;
   name: string;
   phoneNumber: string;
   rut: string;
   address: string;
}


