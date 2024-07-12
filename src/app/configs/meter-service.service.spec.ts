import { TestBed } from '@angular/core/testing';

import { MeterServiceService } from './meter-service.service';

describe('MeterServiceService', () => {
  let service: MeterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
