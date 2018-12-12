import {Injectable} from '@angular/core';
import {WebApiService} from '../webapi';
import {IPlanningService} from './planning.service.interface';
import {HttpMethod} from '../../models/webapi';
import {AppStateService} from '../app-state.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {createPlannings, Planning} from '../../models/planning';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PlanningService implements IPlanningService {

  planningsSubject = new BehaviorSubject<Array<Planning>>([]);

  constructor(private appStateService: AppStateService, private webApiService: WebApiService) {
  }

  savePlanningTimeSlot(data: any): Promise<any> {
    return this.webApiService.getResponse('planning/timeslot/update', HttpMethod.PUT, {});
  }

  fetchPlannings(userid: string): void {
    // this.webApiService.getResponse(`http://127.0.0.1:8440/plannings/id2`, HttpMethod.GET) // ${userid}
    this.webApiService.getResponse(`/api/plannings/`, HttpMethod.GET)
      .then(
        (data: any[]) => {
          // parse data
          console.log('plannings info ', data);
          // @ts-ignore
          const plannings = createPlannings(data);
          console.log('plannings parsed ', plannings);
          this.planningsSubject.next(plannings);
        }, (error: any) => {
          console.error('error get plannings', error);
        }
      );
  }

  getPlannings(): Observable<Array<Planning>> {
    return this.planningsSubject.asObservable();
  }

  deletePlanning(planning: Planning): void {
    // this.webApiService.getResponse('xxx', HttpMethod.POST, { id: planning.planningId })
    //   .then((data: any) => {
    //     this.fetchPlannings();
    //   }, (error: any) => {
    //     console.error('error get plannings', error);
    //   });
  }


}
