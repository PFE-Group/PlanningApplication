import {Planning} from './planning';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  plannings: Array<Planning>;
}

export const createUser = (partialUser: Partial<User>): User => {
  return Object.assign({}, fullUser(), partialUser);
};

export const fullUser = (): User => {
  return {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    login: '',
    plannings: Array<Planning>()
  } as User;
};
