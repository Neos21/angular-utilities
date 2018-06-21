import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegExpComponent } from './regexp.component';

describe('RegExpComponent', () => {
  let component: RegExpComponent;
  let fixture: ComponentFixture<RegExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
