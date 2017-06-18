import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSearchComponent } from './update-search.component';

describe('UpdateSearchComponent', () => {
  let component: UpdateSearchComponent;
  let fixture: ComponentFixture<UpdateSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
