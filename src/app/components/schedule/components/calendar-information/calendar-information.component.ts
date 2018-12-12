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
  startDate: any
  endDate: any
  planningID: string
  planningName: string
  @Input() matDatepicker;

  @Input() for;

  constructor(private webApiService: WebApiService,private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
   
  }
  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningID=planning.id
      this.planningName=planning.name
      console.log(planning.endDate+"|||||||");
    })
  }
  changer() {
    console.log(this.planningName+":"+this.planningID+":"+this.startDate+":"+this.endDate)
    this.webApiService.getResponse('/api/plannings/'+this.planningID,HttpMethod.PATCH,{
      name:this.planningName,
      startDate:this.startDate,
      endDate:this.endDate,
    }).then((res)=>{
      console.log("ok",res)
    }).catch((err)=>{
      console.log("err",err)
    })
  }

}
