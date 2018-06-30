import { TestBed, inject } from '@angular/core/testing';

import { GroupCreateService } from './group-create.service';

describe('GroupCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupCreateService]
    });
  });

  it('should be created', inject([GroupCreateService], (service: GroupCreateService) => {
    expect(service).toBeTruthy();
  }));
});
