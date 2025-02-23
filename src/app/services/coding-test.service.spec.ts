import { TestBed } from '@angular/core/testing';

import { CodingTestService } from './coding-test.service';

describe('CodingTestService', () => {
  let service: CodingTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodingTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
