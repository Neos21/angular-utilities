import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochTimeConverterComponent } from './epoch-time-converter.component';

describe('EpochTimeConverterComponent', () => {
  let component: EpochTimeConverterComponent;
  let fixture: ComponentFixture<EpochTimeConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochTimeConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochTimeConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
