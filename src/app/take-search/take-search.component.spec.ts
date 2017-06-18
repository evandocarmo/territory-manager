import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeSearchComponent } from './take-search.component';

describe('TakeSearchComponent', () => {
  let component: TakeSearchComponent;
  let fixture: ComponentFixture<TakeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
