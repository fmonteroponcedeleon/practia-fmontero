import { TestBed } from '@angular/core/testing';

import { BusinessMockService } from './business-mock.service';

describe('BusinessMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessMockService = TestBed.get(BusinessMockService);
    expect(service).toBeTruthy();
  });
});
