import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarScaleGeneratorComponent } from './guitar-scale-generator.component';

describe('GuitarScaleGeneratorComponent', () => {
  let component: GuitarScaleGeneratorComponent;
  let fixture: ComponentFixture<GuitarScaleGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarScaleGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarScaleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
