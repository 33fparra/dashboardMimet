import { TestBed } from '@angular/core/testing';

import { RfidsService } from './rfids.service';

describe('RfidsService', () => {
  let service: RfidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
