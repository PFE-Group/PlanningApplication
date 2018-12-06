import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInformationComponent } from './calendar-information.component';

describe('CalendarInformationComponent', () => {
  let component: CalendarInformationComponent;
  let fixture: ComponentFixture<CalendarInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
