import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  
  logOutLogo : string;
  @Input() user : User;
  constructor() { }

  ngOnInit() {

    this.logOutLogo = "http://cdn.onlinewebfonts.com/svg/img_235476.png";

  }

  logOut(){
    console.log("log out");
  }

}
