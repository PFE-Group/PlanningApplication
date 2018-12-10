import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeSlotComponent } from './new-time-slot.component';

describe('NewTimeSlotComponent', () => {
  let component: NewTimeSlotComponent;
  let fixture: ComponentFixture<NewTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
