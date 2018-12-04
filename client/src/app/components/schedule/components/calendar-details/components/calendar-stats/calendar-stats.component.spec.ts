import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStatsComponent } from './calendar-stats.component';

describe('CalendarStatsComponent', () => {
  let component: CalendarStatsComponent;
  let fixture: ComponentFixture<CalendarStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
