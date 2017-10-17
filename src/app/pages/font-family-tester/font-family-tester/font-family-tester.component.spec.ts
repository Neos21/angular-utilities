import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontFamilyTesterComponent } from './font-family-tester.component';

describe('FontFamilyTesterComponent', () => {
  let component: FontFamilyTesterComponent;
  let fixture: ComponentFixture<FontFamilyTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontFamilyTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontFamilyTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
