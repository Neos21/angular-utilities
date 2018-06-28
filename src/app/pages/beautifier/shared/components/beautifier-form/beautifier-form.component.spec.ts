import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautifierFormComponent } from './beautifier-form.component';

describe('BeautifierFormComponent', () => {
  let component: BeautifierFormComponent;
  let fixture: ComponentFixture<BeautifierFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautifierFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautifierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
