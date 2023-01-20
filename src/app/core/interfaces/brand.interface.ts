import { Traceable } from './traceable.interface';

export interface IBrands extends Traceable {
   id: string;
   name: string;
   client: {
      id: string;
      name: string;
      phoneNumber: string | null;
      rut: string;
   };
   active: boolean;
   createdAt: number;
   modifiedAt: number;
   deletedAt: number | null;
}



