import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizeToNfcComponent } from './normalize-to-nfc.component';

describe('NormalizeToNfcComponent', () => {
  let component: NormalizeToNfcComponent;
  let fixture: ComponentFixture<NormalizeToNfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizeToNfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizeToNfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
