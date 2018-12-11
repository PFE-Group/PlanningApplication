import {Component, OnInit, Input} from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


@Component({
  selector: 'app-calendar-information',
  templateUrl: './calendar-information.component.html',
  styleUrls: ['./calendar-information.component.css']
})

export class CalendarInformationComponent implements OnInit {
  picker: Timestamp;
  picker2: Timestamp;

  @Input() matDatepicker;

  @Input() for;

  constructor() {
  }

  ngOnInit() {
    this.picker = new Timestamp(0, 0);
    this.picker2 = new Timestamp(0, 0);
  }

  modifyName() {

  }

}
