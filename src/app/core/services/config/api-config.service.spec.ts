import { TestBed, inject } from '@angular/core/testing';

import { ApiConfigService } from './api-config.service';

describe('ApiConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConfigService]
    });
  });

  it('should be created', inject([ApiConfigService], (service: ApiConfigService) => {
    expect(service).toBeTruthy();
  }));
});
