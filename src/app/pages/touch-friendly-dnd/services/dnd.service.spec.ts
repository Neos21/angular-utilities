import { TestBed, inject } from '@angular/core/testing';

import { DndService } from './dnd.service';

describe('DndService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DndService]
    });
  });

  it('should be created', inject([DndService], (service: DndService) => {
    expect(service).toBeTruthy();
  }));
});
