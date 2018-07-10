import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourConverterComponent } from './colour-converter.component';

describe('ColourConverterComponent', () => {
  let component: ColourConverterComponent;
  let fixture: ComponentFixture<ColourConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
