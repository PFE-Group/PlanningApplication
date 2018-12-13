import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  step = 0;
  showError: boolean
  showOk: boolean
  messageError() {
    this.showError = true;
    this.showOk = false;

  }
  messageOK() {
    this.showError = false;

    this.showOk = true;
  }
  ngOnInit() {
    this.showError = false;
    this.showOk = false;

  }

  setStep(index: number) {
    this.showError = false;
    this.showOk = false;

    this.step = index;
  }

  nextStep() {
    this.showError = false;
    this.showOk = false;

    this.step++;
  }

  prevStep() {
    this.showError = false;
    this.showOk = false;

    this.step--;
  }

  constructor() {

  }


}


