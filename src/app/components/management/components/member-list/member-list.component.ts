import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user';
import { Member ,createMember} from 'src/app/shared/models/member';
import { UserRole} from './models/role'
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  memberList: Array<Member>;
  memberListAdmin: Array<Member>
  memberListMember: Array<Member>
  memberListInvite: Array<Member>
  // roles: Array<string>;
  // @Input() user: User;
  UserRole= UserRole
  currentState: UserRole
  constructor() { }

  ngOnInit() {
    this.currentState=UserRole.all
    var jsonUsers = {
      "users": [{
        "idUser":"lkefjfo",
        "firstName": "dani",
        "lastName": "rocha",
        "login": "danii",
        "profilePicture": ".....",
        "role":"admin"
      },
      {
        "idUser":"ffezfez",
        "firstName": "ismail",
        "lastName": "abdou",
        "login": "isma",
        "profilePicture": ".....",
        "role":"membre"
      }, {
        "idUser":"fzfz",
        "firstName": "youness",
        "lastName": "Belhassnaoui",
        "login": "you",
        "profilePicture": ".....",
        "role":"invite"
      }
      ]
    }
    this.memberList = Array<Member>();
    this.memberListAdmin= Array<Member>();
    this.memberListMember=Array<Member>();
    this.memberListInvite= Array<Member>();

    jsonUsers.users.forEach(element => {
      var member= createMember({
        user: createUser({
          firstName:element.firstName,
          lastName: element.lastName,
          login: element.login,
          profilePicture: element.profilePicture,
          userId: element.idUser
        }),
        role:element.role
      })
      if(member.role==="admin")
        this.memberListAdmin.push(member)
      if(member.role==="invite")
        this.memberListInvite.push(member)
      if(member.role==="membre")
        this.memberListMember.push(member)
      this.memberList.push(member)
    });
  }
  setCurrentState( role :UserRole){
    this.currentState = role
  }

}
