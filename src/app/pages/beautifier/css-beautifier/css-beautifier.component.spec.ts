import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssBeautifierComponent } from './css-beautifier.component';

describe('CssBeautifierComponent', () => {
  let component: CssBeautifierComponent;
  let fixture: ComponentFixture<CssBeautifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssBeautifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssBeautifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
