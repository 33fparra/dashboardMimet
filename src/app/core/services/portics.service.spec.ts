import { TestBed } from '@angular/core/testing';

import { PorticsService } from './portics.service';

describe('PorticsService', () => {
  let service: PorticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
