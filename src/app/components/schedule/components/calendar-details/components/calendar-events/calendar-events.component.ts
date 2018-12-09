import {Component, OnInit} from '@angular/core';
import {PlanningEvent} from 'src/app/shared/models/planning-event';
import {TimeSlot} from 'src/app/shared/models/time-slot';
import {AppStateService} from '../../../../../../shared/services/app-state.service';
import {Planning} from '../../../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})
export class CalendarEventsComponent implements OnInit {

  planningEvents = Array<PlanningEvent>();
  timeSlots = Array<TimeSlot>();

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  addEvent(){
    // const today = new Date();
    // this.timeSlots.push(createTimeSlot({
    //   start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()),
    //   end : new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()),
    //   event : this.planningEvent,
    //   done : false
    // }as Partial<TimeSlot>));
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) =>  {
      this.timeSlots = planning.timeSlots;
      this.planningEvents = planning.events;
    });
  }



}
