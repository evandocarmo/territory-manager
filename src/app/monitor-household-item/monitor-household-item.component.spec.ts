import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorHouseholdItemComponent } from './monitor-household-item.component';

describe('MonitorHouseholdItemComponent', () => {
  let component: MonitorHouseholdItemComponent;
  let fixture: ComponentFixture<MonitorHouseholdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHouseholdItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorHouseholdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
