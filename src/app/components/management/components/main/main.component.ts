import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  step = 0;
  showError:boolean
  inviteError(){
    this.showError=true;
  }
  ngOnInit() {
    this.showError=false;
  }

  setStep(index: number) {
    this.showError=false;

    this.step = index;
  }

  nextStep() {
    this.showError=false;

    this.step++;
  }

  prevStep() {
    this.showError=false;

    this.step--;
  }

  constructor() {

  }


}


