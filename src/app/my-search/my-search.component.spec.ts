import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySearchComponent } from './my-search.component';

describe('MySearchComponent', () => {
  let component: MySearchComponent;
  let fixture: ComponentFixture<MySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
