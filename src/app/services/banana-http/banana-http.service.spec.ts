import { TestBed } from '@angular/core/testing';

import { BananaHttpService } from './banana-http.service';

describe('BananaHttpService', () => {
  let service: BananaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BananaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
