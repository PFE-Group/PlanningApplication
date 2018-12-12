import { Component, OnInit, Input } from '@angular/core';
import {Planning} from '../../../../shared/models/planning';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {

  @Input() plannings: Array<Planning>;

  constructor() { }

  ngOnInit() {
  }

  deletePlanning(planning: Planning) {
    this.plannings.splice(this.plannings.indexOf(planning), 1);;
  }

}
