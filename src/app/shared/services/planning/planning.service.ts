import {Injectable} from '@angular/core';
import {WebApiService} from '../webapi';
import {IPlanningService} from './planning.service.interface';
import {HttpMethod} from '../../models/webapi';
import {AppStateService} from '../app-state.service';

@Injectable()
export class PlanningService implements IPlanningService {

  constructor(private appStateService: AppStateService, private webApiService: WebApiService) { }

  savePlanningTimeSlot(data: any): Promise<any> {
    return this.webApiService.getResponse('planning/timeslot/update', HttpMethod.PUT, { });
  }

}
