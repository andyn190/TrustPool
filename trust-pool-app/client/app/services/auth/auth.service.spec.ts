import { TestBed, inject } from '@angular/core/testing';

import { OwnAuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnAuthService]
    });
  });

  it('should be created', inject([OwnAuthService], (service: OwnAuthService) => {
    expect(service).toBeTruthy();
  }));
});
