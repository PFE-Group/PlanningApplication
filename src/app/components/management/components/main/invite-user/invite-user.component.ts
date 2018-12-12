import { Component, OnInit,EventEmitter, Output} from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user'
import { WebApiService } from 'src/app/shared/services/webapi';
import {HttpMethod} from 'src/app/shared/models/webapi';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MemberListService } from 'src/app/shared/services/memberList/memberlistService';
import { AppStateService } from '../../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import {Planning} from '../../../../../shared/models/planning';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<String[]>;
  users = Array<User>();
  loginUser :string;
  membre: boolean;
  planningCurrent: Planning;
  // avertir parent qu'il y a une erreur 
  @Output() inviteError = new EventEmitter<any>();
  constructor(private webApiService: WebApiService,private memberService: MemberListService,private appStateService: AppStateService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.webApiService.getResponse('/api/users', HttpMethod.GET, { }).then((res)=>{
      this.users=res
      console.log(res);
    })
     this.listenToCurrentPlanning()
  }
  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningCurrent=planning

    })
  }
  inviteUser(){
    var role='';
    if(this.membre===true)
      role="membre"
    else
      role="invite"
      this.webApiService.getResponse('/api/plannings/'+this.planningCurrent.id+'/member', HttpMethod.PUT, {
        login:this.loginUser,
        role:role
      }).then((res)=>{
        if(res.status!==200)
          this.memberService.getMembersOnServer(res['users'][this.loginUser]);
      }).catch((res)=>{
        console.log("error inviteUser"+ res)
        this.inviteError.emit();
      })
  }


  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.users.map(user=>user.login).filter(login =>login.toLowerCase().indexOf(filterValue) === 0);
  }
  

}
