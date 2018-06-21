import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGenerateFormComponent } from './dynamic-generate-form.component';

describe('DynamicGenerateFormComponent', () => {
  let component: DynamicGenerateFormComponent;
  let fixture: ComponentFixture<DynamicGenerateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicGenerateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGenerateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
