import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningNameDialogComponent } from './planning-name-dialog.component';

describe('PlanningNameDialogComponent', () => {
  let component: PlanningNameDialogComponent;
  let fixture: ComponentFixture<PlanningNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
