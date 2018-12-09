import {Observable} from 'rxjs';
import {Planning} from '../../models/planning';

export interface IPlanningService {

  fetchPlannings(userid: string): void;

  getPlannings(): Observable<Array<Planning>>;

  deletePlanning(planning: Planning): void;

  savePlanningTimeSlot(data: any): Promise<any>;

}
