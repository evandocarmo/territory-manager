import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisitComponent } from './admin-visit.component';

describe('AdminVisitComponent', () => {
  let component: AdminVisitComponent;
  let fixture: ComponentFixture<AdminVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
