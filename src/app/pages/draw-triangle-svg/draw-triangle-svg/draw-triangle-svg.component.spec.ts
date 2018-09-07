import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawTriangleSvgComponent } from './draw-triangle-svg.component';

describe('DrawTriangleSvgComponent', () => {
  let component: DrawTriangleSvgComponent;
  let fixture: ComponentFixture<DrawTriangleSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawTriangleSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawTriangleSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
