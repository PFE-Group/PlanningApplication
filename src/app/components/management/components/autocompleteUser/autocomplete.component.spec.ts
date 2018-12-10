import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteComponentUser } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponentUser;
  let fixture: ComponentFixture<AutocompleteComponentUser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponentUser ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
