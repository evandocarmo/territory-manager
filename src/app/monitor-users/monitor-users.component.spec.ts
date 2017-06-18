import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorUsersComponent } from './monitor-users.component';

describe('MonitorUsersComponent', () => {
  let component: MonitorUsersComponent;
  let fixture: ComponentFixture<MonitorUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
