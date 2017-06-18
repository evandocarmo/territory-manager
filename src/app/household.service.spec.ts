import { TestBed, inject } from '@angular/core/testing';

import { HouseholdService } from './household.service';

describe('HouseholdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HouseholdService]
    });
  });

  it('should be created', inject([HouseholdService], (service: HouseholdService) => {
    expect(service).toBeTruthy();
  }));
});
