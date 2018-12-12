import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { AppStateService } from '../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import { Planning } from '../../../../shared/models/planning';
import { WebApiService } from 'src/app/shared/services/webapi';
import { HttpMethod } from 'src/app/shared/models/webapi';


@Component({
  selector: 'app-calendar-information',
  templateUrl: './calendar-information.component.html',
  styleUrls: ['./calendar-information.component.css']
})

export class CalendarInformationComponent implements OnInit {
  startDate: Date
  endDate: Date
  planningID: string
  planningName: string
  planningNameBeforeUp:string
  showUpdate: boolean
  @Input() matDatepicker;

  @Input() for;

  constructor(private webApiService: WebApiService, private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
    this.showUpdate = false
  }
  modify() {
    this.showUpdate = true
  }
  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningID = planning.id;
      this.planningName = planning.name;
      this.endDate = planning.endDate;
      this.startDate = planning.startDate;

    })
  }
  changer() {
    this.showUpdate = false
    console.log(this.planningNameBeforeUp + ":" + this.planningID + ":" + this.startDate + ":" + this.endDate)
    // this.webApiService.getResponse('/api/plannings/'+this.planningID,HttpMethod.PATCH,{
    //   name:this.planningName,
    //   startDate:this.startDate,
    //   endDate:this.endDate,
    // }).then((res)=>{
    //   console.log("ok",res)
    // }).catch((err)=>{
    //   console.log("err",err)
    // })
  }

}
