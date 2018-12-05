import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  public user = new User();
  logOutLogo : string;

  constructor() { }

  ngOnInit() {

    user.firstName = "Ronsmans";
    user.lastName = "Thomas";
    user.login = "T.R";
    user.profilePicture = "../../../../../assets/default_image_profile.png";
    this.logOutLogo = "../../../../../assets/log_out_logo.png";

  }

  logOut(){
    console.log("log out");
  }

}
