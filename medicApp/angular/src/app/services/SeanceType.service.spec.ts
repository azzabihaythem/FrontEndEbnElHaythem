/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeanceTypeService } from './SeanceType.service';

describe('Service: SeanceType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeanceTypeService]
    });
  });

  it('should ...', inject([SeanceTypeService], (service: SeanceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
