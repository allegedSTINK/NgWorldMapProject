import { TestBed } from '@angular/core/testing';

import { PathLoaderService } from './path-loader.service';

describe('PathLoaderService', () => {
  let service: PathLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
