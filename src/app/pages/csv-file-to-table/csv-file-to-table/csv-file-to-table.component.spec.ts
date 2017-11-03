import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvFileToTableComponent } from './csv-file-to-table.component';

describe('CsvFileToTableComponent', () => {
  let component: CsvFileToTableComponent;
  let fixture: ComponentFixture<CsvFileToTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvFileToTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvFileToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
