import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectCharacterComponent } from './detect-character.component';

describe('DetectCharacterComponent', () => {
  let component: DetectCharacterComponent;
  let fixture: ComponentFixture<DetectCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
