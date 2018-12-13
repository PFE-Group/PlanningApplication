import {Injectable} from '@angular/core';
import {WebApiService} from '../webapi';
import {IPlanningService} from './planning.service.interface';
import {HttpMethod} from '../../models/webapi';
import {AppStateService} from '../app-state.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {createPlanning, createPlannings, Planning} from '../../models/planning';
import {TimeSlot} from '../../models/time-slot';
import {Task} from '../../models/task';

@Injectable()
export class PlanningService implements IPlanningService {

  planningsSubject = new BehaviorSubject<Array<Planning>>([]);

  constructor(private appStateService: AppStateService, private webApiService: WebApiService) {
  }

  fetchPlannings(): void {
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

  updateTask(task: Task, planning: Planning) {
    const payload = {
      name: task.name,
      hoursExpected: task.hoursExpected,
      color: task.color
    };
    this.webApiService.getResponse(`/api/plannings/${planning.id}/task/${task.name}`, HttpMethod.PATCH, payload)
      .then(
        (data: any) => {
          console.log('task updated ', data);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error updating task', error);
        }
      );
  }

  addPlanning(planning: Planning) {
    const payload = {
      name: planning.name,
      startDate: {
        _seconds: planning.startDate.getTime() / 1000,
        _nanoseconds: 0
      },
      endDate: {
        _seconds: planning.endDate.getTime() / 1000,
        _nanoseconds: 0
      },
    };
    this.webApiService.getResponse(`/api/plannings/planning`, HttpMethod.POST, payload)
      .then(
        (data: any) => {
          console.log('planning created ', data);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error creating planning', error);
        }
      );
  }

  updatePlanning(planning: Planning): void {
    const payload = {
      name: planning.name,
      startDate: {
        _seconds: planning.startDate.getTime() / 1000,
        _nanoseconds: 0
      },
      endDate: {
        _seconds: planning.endDate.getTime() / 1000,
        _nanoseconds: 0
      },
    };
    this.webApiService.getResponse(`/api/plannings/${planning.id}`, HttpMethod.PATCH, payload)
      .then(
        (data: any) => {
          console.log('planning updated ', data);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error updating planning', error);
        }
      );
  }

  deletePlanning(planning: Planning): void {
    this.webApiService.getResponse(`/api/plannings/${planning.id}`, HttpMethod.DELETE)
      .then((data: any) => {
        this.fetchPlannings();
      }, (error: any) => {
        console.error('error deleting planning', error);
      });
  }

  updateTimeSlot(timeSlot: TimeSlot, planning: Planning) {
    const payload = {
      task: timeSlot.task.name,
      done: timeSlot.done,
      startHour: {
        _seconds: timeSlot.startHour.getTime() / 1000,
        _nanoseconds: 0
      },
      endHour: {
        _seconds: timeSlot.endHour.getTime() / 1000,
        _nanoseconds: 0
      },
    };
    this.webApiService.getResponse(`/api/plannings/${planning.id}/timeslot/${timeSlot.id}`, HttpMethod.PATCH, payload)
      .then(
        (data: any) => {
          console.log('planning timeslot updated ', timeSlot.id);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error updating planning timeslot', error);
        }
      );
  }

  deleteTimeSlot(timeSlot: TimeSlot, planning: Planning) {
    this.webApiService.getResponse(`/api/plannings/${planning.id}/timeslot/${timeSlot.id}`, HttpMethod.DELETE)
      .then(
        (data: any[]) => {
          console.log('planning timeslot deleted ', timeSlot.id);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error deleting planning timeslot', error);
        }
      );
  }

  addTimeSlot(planning: Planning) {
    const today = new Date();
    const payload = {
      task: planning.tasks[0].name,
      startHour: {
        _seconds: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()).getTime() / 1000,
        _nanoseconds: 0
      },
      endHour: {
        _seconds: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1).getTime() / 1000,
        _nanoseconds: 0
      }
    };
    this.webApiService.getResponse(`/api/plannings/${planning.id}/timeslot`, HttpMethod.POST, payload)
      .then(
        (data: any) => {
          console.log('planning timeslot created ', data);
          this.appStateService.setCurrentPlanning(createPlanning(data));
        }, (error: any) => {
          console.error('error creating planning timeslot', error);
        }
      );
  }

}
