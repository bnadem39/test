import { TestBed } from '@angular/core/testing';

import { UserBenaliAdemService } from './user-benali-adem.service';

describe('UserBenaliAdemService', () => {
  let service: UserBenaliAdemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBenaliAdemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
