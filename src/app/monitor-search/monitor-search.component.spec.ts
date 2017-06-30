import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSearchComponent } from './monitor-search.component';

describe('MonitorSearchComponent', () => {
  let component: MonitorSearchComponent;
  let fixture: ComponentFixture<MonitorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
