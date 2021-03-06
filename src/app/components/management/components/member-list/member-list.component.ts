import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user';
import { Member, createMember } from 'src/app/shared/models/member';
import { UserRole } from './models/role'
import { HttpMethod } from 'src/app/shared/models/webapi';
import { AppStateService } from '../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import { Planning } from '../../../../shared/models/planning';


import { WebApiService } from 'src/app/shared/services/webapi';
import { MemberListService } from 'src/app/shared/services/memberList/memberlistService';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  memberList: Array<Member>
  memberListAdmin: Array<Member>
  memberListMember: Array<Member>
  memberListInvite: Array<Member>
  UserRole = UserRole
  currentState: UserRole
  currentPlanning: string

  good: boolean = true;
  messageError: string;

  constructor(private webApiService: WebApiService, private appStateService: AppStateService, private memberService: MemberListService) { }
  change(res: any) {
    var user = createUser({
      id: res.id,
      firstName: res.firstName,
      lastName: res.lastName,
    })
    var member = createMember({
      role: res.role,
      user: user
    })
    this.memberList.push(member)
    if (member.role === "admin")
      this.memberListAdmin.push(member)
    if (member.role === "membre")
      this.memberListMember.push(member)
    if (member.role === "invite")
      this.memberListInvite.push(member)

  }
  ngOnInit() {
    this.memberList = Array<Member>();
    this.memberListAdmin = Array<Member>();
    this.memberListMember = Array<Member>();
    this.memberListInvite = Array<Member>();
    this.currentState = UserRole.all
    this.listenToCurrentPlanning();

    this.memberService.subscribe(this);
  }
  setCurrentState(role: UserRole) {
    this.currentState = role
  }
  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.clearList()
      this.currentPlanning = planning.id
      this.getAllUsersPlanning(planning.id);
    })
  }
  clearList() {
    this.memberList.length = 0;
    this.memberListAdmin.length = 0;
    this.memberListInvite.length = 0;
    this.memberListMember.length = 0;
  }
  getAllUsersPlanning(idPlanning) {
    this.webApiService.getResponse('/api/plannings/users/' + idPlanning, HttpMethod.GET, {}).then((res) => {
      // res.sort((el1,el2)=> (el1.login).localeCompare(el2.login));
      for (var i in res) {
        var member = createMember({
          user: createUser({
            firstName: res[i].firstName,
            lastName: res[i].lastName,
            id: res[i].id
          }),
          role: res[i].role
        })
        this.memberList.push(member)
        if (member.role === "admin")
          this.memberListAdmin.push(member)
        if (member.role === "membre")
          this.memberListMember.push(member)
        if (member.role === "invite")
          this.memberListInvite.push(member)

      }
    })
  }

  deleteUser(user) {
    this.webApiService.getResponse('/api/plannings/' + this.currentPlanning + "/member/" + user.user.id, HttpMethod.DELETE, {})
      .then((res) => {
        this.good = true;
        this.clearList()
        this.getAllUsersPlanning(this.currentPlanning);
      })
      .catch((err) => {
        this.good = false;
        this.messageError = err.error.message;
      })
  }

}
