import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeVisitsComponent } from './take-visits.component';

describe('TakeVisitsComponent', () => {
  let component: TakeVisitsComponent;
  let fixture: ComponentFixture<TakeVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
