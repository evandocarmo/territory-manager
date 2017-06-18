import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHouseholdComponent } from './new-household.component';

describe('NewHouseholdComponent', () => {
  let component: NewHouseholdComponent;
  let fixture: ComponentFixture<NewHouseholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHouseholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
