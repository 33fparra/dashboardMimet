import { Traceable } from './traceable.interface';

export interface IPortics extends Traceable {
   id: string;
   code: string;
   address: string;
   active: boolean;
   createdAt: number;
   modifiedAt: number;
   deletedAt: number | null;
}
