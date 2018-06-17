import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineNumberComponent } from './add-line-number.component';

describe('AddLineNumberComponent', () => {
  let component: AddLineNumberComponent;
  let fixture: ComponentFixture<AddLineNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLineNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLineNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
