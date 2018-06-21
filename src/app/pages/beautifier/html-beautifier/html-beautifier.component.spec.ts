import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlBeautifierComponent } from './html-beautifier.component';

describe('HtmlBeautifierComponent', () => {
  let component: HtmlBeautifierComponent;
  let fixture: ComponentFixture<HtmlBeautifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlBeautifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlBeautifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
