import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHouseholdsComponent } from './display-households.component';

describe('DisplayHouseholdsComponent', () => {
  let component: DisplayHouseholdsComponent;
  let fixture: ComponentFixture<DisplayHouseholdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHouseholdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHouseholdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
