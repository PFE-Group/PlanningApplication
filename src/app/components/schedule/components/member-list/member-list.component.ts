import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  memberList: Array<User>;
  roles: Array<string>;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    this.memberList = Array<User>();
    this.memberList.push(this.user);
    this.roles = Array<string>();
    this.roles.push('Admin');
    this.roles.push('Membre');
    this.roles.push('Invité');
  }

}
