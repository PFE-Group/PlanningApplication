import { Component, OnInit } from '@angular/core';
import {ManagementEnum} from './models/management.enum';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  // control navbar 
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  //show the good screen 
  ManagementEnum = ManagementEnum; 
  currentState : ManagementEnum;
  constructor() { 
    this.currentState=ManagementEnum.plannings;
  }

  ngOnInit() {
  }
  setState(value: ManagementEnum) {
    this.currentState = value;
  }
  
}
