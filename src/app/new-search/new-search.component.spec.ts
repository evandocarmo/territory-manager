import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchComponent } from './new-search.component';

describe('NewSearchComponent', () => {
  let component: NewSearchComponent;
  let fixture: ComponentFixture<NewSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
