import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDiffComponent } from './multiple-diff.component';

describe('MultipleDiffComponent', () => {
  let component: MultipleDiffComponent;
  let fixture: ComponentFixture<MultipleDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
