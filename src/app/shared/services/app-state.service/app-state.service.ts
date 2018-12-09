import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {Planning} from '../../models/planning';

@Injectable()
export class AppStateService {

  currentPlanningSubject = new BehaviorSubject<Planning>(undefined)

  constructor() { }

  getCurrentPlanning() {
    return this.currentPlanningSubject.asObservable();
  }

  setCurrentPlanning(planning: Planning) {
    this.currentPlanningSubject.next(planning);
  }

}
