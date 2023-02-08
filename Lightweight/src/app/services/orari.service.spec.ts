import { TestBed } from '@angular/core/testing';

import { OrariService } from './orari.service';

describe('OrariService', () => {
  let service: OrariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
