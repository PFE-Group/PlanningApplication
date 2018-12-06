import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  user = new User("Thomas","Ronsmans","T.R","../../../../../assets/default_image_profile.png");
  logOutLogo : string;

  constructor() { }

  ngOnInit() {

    this.logOutLogo = "../../../../../assets/log_out_logo.png";

  }

  logOut(){
    console.log("log out");
  }

}
