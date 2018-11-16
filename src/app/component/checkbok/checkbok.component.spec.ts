import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbokComponent } from './checkbok.component';

describe('CheckbokComponent', () => {
  let component: CheckbokComponent;
  let fixture: ComponentFixture<CheckbokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
