import { Profile } from "./Profile";

export interface User {
     id: number ;
     identificationNumber: string;
     userName: string;
     firstName: string;
     lastName: string;
     email:string;
     photo:string;
     profile?: Profile | null; 
     manager?: User; // Self-referencing for manager
     nbrCaseAffected:any //normally its a number but i have error with Promise<number |undefind > 
     status?:string
}

