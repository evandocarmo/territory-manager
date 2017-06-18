import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHouseholdsInCardsComponent } from './display-households-in-cards.component';

describe('DisplayHouseholdsInCardsComponent', () => {
  let component: DisplayHouseholdsInCardsComponent;
  let fixture: ComponentFixture<DisplayHouseholdsInCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHouseholdsInCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHouseholdsInCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
