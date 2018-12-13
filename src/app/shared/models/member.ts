import {User, fullUser} from './user';
import {Planning, fullPlanning} from './planning';

export interface Member {
  user: User;
  role: string;
  planning: Planning;

}

export const createMember = (partialMember: Partial<Member>): Member => {
  return Object.assign({}, fullMember(), partialMember);
};

export const fullMember = (): Member => {
  return {
    user: fullUser(),
    role: '',
    planning: fullPlanning(),
  } as Member;
};
