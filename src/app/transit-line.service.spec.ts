import { TestBed } from '@angular/core/testing';

import { TransitLineService } from './transit-line.service';

describe('TransitLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransitLineService = TestBed.get(TransitLineService);
    expect(service).toBeTruthy();
  });
});
