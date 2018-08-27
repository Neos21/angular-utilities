import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncoderDecoderComponent } from './encoder-decoder.component';

describe('EncoderDecoderComponent', () => {
  let component: EncoderDecoderComponent;
  let fixture: ComponentFixture<EncoderDecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncoderDecoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncoderDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
