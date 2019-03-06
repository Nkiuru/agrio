import { TestBed } from '@angular/core/testing';

import { StoresService } from './stores.service';

describe('StoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoresService = TestBed.get(StoresService);
    expect(service).toBeTruthy();
  });
});
