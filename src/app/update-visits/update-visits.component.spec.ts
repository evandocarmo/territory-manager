import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisitsComponent } from './update-visits.component';

describe('UpdateVisitsComponent', () => {
  let component: UpdateVisitsComponent;
  let fixture: ComponentFixture<UpdateVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
