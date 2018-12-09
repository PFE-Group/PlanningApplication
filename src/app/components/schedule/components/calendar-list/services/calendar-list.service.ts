import { Injectable } from '@angular/core';
import {HttpMethod} from '../../../../../shared/models/webapi';
import {WebApiService} from '../../../../../shared/services/webapi';
import {createPlannings, Planning} from '../../../../../shared/models/planning';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICalendarListService} from './calendar-list.interface';


@Injectable()
export class CalendarListService implements ICalendarListService {

  planningsSubject = new BehaviorSubject<Array<Planning>>([]);

  constructor(private webApiService: WebApiService) { }

  fetchPlannings(userid: string): void {
    this.webApiService.getResponse(`http://127.0.0.1:8440/plannings/id2`, HttpMethod.GET) //${userid}
    // this.webApiService.getResponse(`https://pfe-scheduly-dev.herokuapp.com/api/plannings`, HttpMethod.GET) //${userid}
      .then(
        (data: any[]) => {
          // parse data
          console.info('plannings info', data);
          // @ts-ignore
          const plannings = createPlannings(data.plannings);
          console.info('plannings parsed', plannings);
          this.planningsSubject.next(plannings);
        }, (error: any) => {
          console.error('error get plannings', error);
        });
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
