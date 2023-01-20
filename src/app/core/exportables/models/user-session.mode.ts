import { IUsers } from '../../interfaces/user.interface';

export class UserSession implements IUsers {
   id!: string;
   fullname!: string;
   email!: string;
   role!: string;
   active!: boolean;
   clientId!: string;
   clientName!: string;
   clientRut!: string;
   createdAt!: number;
   modifiedAt!: number;
   deletedAt!: number | null;
}

