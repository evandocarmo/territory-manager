import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorTerritoryComponent } from './monitor-territory.component';

describe('MonitorTerritoryComponent', () => {
  let component: MonitorTerritoryComponent;
  let fixture: ComponentFixture<MonitorTerritoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorTerritoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorTerritoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
