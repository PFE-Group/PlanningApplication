import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteComponentTasks } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponentTasks;
  let fixture: ComponentFixture<AutocompleteComponentTasks>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponentTasks ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponentTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
