import {Injectable} from '@angular/core';
import {WebApiService} from '../webapi';
import {HttpMethod} from '../../models/webapi';
import { Member,createMember } from '../../models/member';
import {createUser } from '../../models/user';
import { MemberListComponent } from 'src/app/components/management/components/member-list/member-list.component'
@Injectable()
export class MemberListService {

  members = Array<Member>();
  memberComponent : MemberListComponent ;
  
  constructor( private webApiService: WebApiService) { }
  subscribe(member: MemberListComponent){
    this.memberComponent=member
  }
  getMembersOnServer(res: any){
    this.memberComponent.change(res);
  }
}
