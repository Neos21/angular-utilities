import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaScriptBeautifierComponent } from './javascript-beautifier.component';

describe('JavaScriptBeautifierComponent', () => {
  let component: JavaScriptBeautifierComponent;
  let fixture: ComponentFixture<JavaScriptBeautifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavaScriptBeautifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaScriptBeautifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
