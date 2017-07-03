import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorHouseholdsComponent } from './monitor-households.component';

describe('MonitorHouseholdsComponent', () => {
  let component: MonitorHouseholdsComponent;
  let fixture: ComponentFixture<MonitorHouseholdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHouseholdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorHouseholdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
