import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHiveManagerComponent } from './coin-hive-manager.component';

describe('CoinHiveManagerComponent', () => {
  let component: CoinHiveManagerComponent;
  let fixture: ComponentFixture<CoinHiveManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinHiveManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinHiveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
