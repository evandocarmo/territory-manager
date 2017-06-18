import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardComponent } from './new-card.component';

describe('NewCardComponent', () => {
  let component: NewCardComponent;
  let fixture: ComponentFixture<NewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
