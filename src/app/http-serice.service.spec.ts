import { TestBed } from '@angular/core/testing';

import { HttpSericeService } from './http-serice.service';

describe('HttpSericeService', () => {
  let service: HttpSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
