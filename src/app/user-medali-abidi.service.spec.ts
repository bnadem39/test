import { TestBed } from '@angular/core/testing';

import { UserMedaliAbidiService } from './user-medali-abidi.service';

describe('UserMedaliAbidiService', () => {
  let service: UserMedaliAbidiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMedaliAbidiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
