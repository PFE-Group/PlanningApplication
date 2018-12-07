import { Injectable } from '@angular/core';
import {HttpMethod} from '../../../../../shared/models/webapi';
import {WebApiService} from '../../../../../shared/services/webapi';
import {Planning} from '../../../../../shared/models/planning';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICalendarListService} from './calendar-list.interface';


@Injectable()
export class CalendarListService implements ICalendarListService {

  planningsSubject = new BehaviorSubject<Array<Planning>>([]);

  constructor(private webApiService: WebApiService) { }

  fetchPlannings(): void {
    this.webApiService.getResponse('http://127.0.0.1:8440/plannings/idmec', HttpMethod.GET)
      .then(
        (data: Array<any>) => {
          // parse data
          console.info('plannings info', data);
          this.planningsSubject.next(data.plannings);
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
