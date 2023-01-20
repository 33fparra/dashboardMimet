import { Traceable } from './traceable.interface';

export interface IUsers extends Traceable {
   id: string;
   fullname: string;
   email: string;
   role: string;
   active: boolean;
   clientId: string;
   clientName: string;
   clientRut: string;
   createdAt: number;
   modifiedAt: number;
   deletedAt: number | null;
}

export interface Client {
   rut: string;
   id: string;
   name: string;
}
