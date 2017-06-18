import { TestBed, inject } from '@angular/core/testing';

import { TerritoryService } from './territory.service';

describe('TerritoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerritoryService]
    });
  });

  it('should be created', inject([TerritoryService], (service: TerritoryService) => {
    expect(service).toBeTruthy();
  }));
});
