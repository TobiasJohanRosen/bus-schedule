import { TestBed } from '@angular/core/testing';

import { TransitLineService } from './transit-line.service';
import { HttpClientModule } from '@angular/common/http';

describe('TransitLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: TransitLineService = TestBed.get(TransitLineService);
    expect(service).toBeTruthy();
  });
});
