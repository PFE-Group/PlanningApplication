import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {Planning} from '../../models/planning';
import {User} from '../../models/user';

@Injectable()
export class AppStateService {

  currentPlanningSubject = new BehaviorSubject<Planning>(undefined);
  currentUserSubject = new BehaviorSubject<User>(undefined);

  constructor() {
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getCurrentPlanning() {
    return this.currentPlanningSubject.asObservable();
  }

  setCurrentPlanning(planning: Planning) {
    this.currentPlanningSubject.next(planning);
  }

}
