import { TestBed } from '@angular/core/testing';

import { EserciziService } from './esercizi.service';

describe('EserciziService', () => {
  let service: EserciziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EserciziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
