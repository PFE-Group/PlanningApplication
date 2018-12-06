import { Planning } from "./planning";

export class User {
    firstName: string;
    lastName: string;
    login: string;
    profilePicture: string;
    plannings: Array<Planning>;

    constructor(private fn: string, private ln: string, private lg: string, private pp: string){
        this.firstName = fn;
        this.lastName = ln;
        this.login = lg;
        this.profilePicture = pp;
    }

}
  
