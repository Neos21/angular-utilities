import { inject, TestBed } from '@angular/core/testing';

import { CoinHiveService } from './coin-hive.service';

describe('CoinHiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinHiveService]
    });
  });
  
  it('should be created', inject([CoinHiveService], (service: CoinHiveService) => {
    expect(service).toBeTruthy();
  }));
});
