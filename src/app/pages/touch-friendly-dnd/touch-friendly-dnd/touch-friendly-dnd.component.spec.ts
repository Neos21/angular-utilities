import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchFriendlyDndComponent } from './touch-friendly-dnd.component';

describe('TouchFriendlyDndComponent', () => {
  let component: TouchFriendlyDndComponent;
  let fixture: ComponentFixture<TouchFriendlyDndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchFriendlyDndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchFriendlyDndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
