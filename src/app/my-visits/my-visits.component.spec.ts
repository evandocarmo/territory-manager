import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisitsComponent } from './my-visits.component';

describe('MyVisitsComponent', () => {
  let component: MyVisitsComponent;
  let fixture: ComponentFixture<MyVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
