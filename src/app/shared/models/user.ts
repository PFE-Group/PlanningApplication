import { Planning } from "./planning";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    login: string;
    profilePicture: string;
    plannings: Array<Planning>;
}

export const createUser = (partialUser: Partial<User>):User =>{
    return Object.assign({}, fullUser(), partialUser);
}
  
export const fullUser = ():User =>{
    return{
        userId: '',
        firstName:'',
        lastName:'',
        login:'',
        profilePicture:'',
        plannings:Array<Planning>()
    } as User
}
