import {Component, OnInit} from '@angular/core';
import {AppStateService} from '../../../../shared/services/app-state.service';
import {convertTimeSlotsToCalendarEvent} from '../../../../shared/models/time-slot';
import {Planning} from '../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';
import {CalendarEvent, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {Subject} from 'rxjs';
import {PlanningService} from '../../../../shared/services/planning';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  date = new Date();
  timeSlots = Array<CalendarEvent>();
  refresh = new Subject<void>();

  constructor(private appStateService: AppStateService,
              private planningService: PlanningService) { }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  gotoLastWeek(): void {
    const today = this.date;
    this.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  }

  goToNextWeek(): void {
    const today = this.date;
    this.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    const index = this.timeSlots.indexOf(event);
    if (index >= 0) {
      // this.planningService.savePlanningTimeSlot({})
      //   .then((data: any) => {
      //     this.timeSlots[index].start = newStart;
      //     this.timeSlots[index].end = newEnd;
      //     this.refreshCalendar();
      //   }, (error: any) => {
      //     console.error('error updating planning');
      //
      //   });
      this.timeSlots[index].start = newStart;
      this.timeSlots[index].end = newEnd;
      this.refreshCalendar();
    } else {
      console.warn('element not found');
    }
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) =>  {
      this.timeSlots = convertTimeSlotsToCalendarEvent(planning.timeSlots);
    });
  }

  private refreshCalendar(): void {
    this.refresh.next();
  }
}
