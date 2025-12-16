import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMedaliAbidiComponent } from './user-list-medali-abidi.component';

describe('UserListMedaliAbidiComponent', () => {
  let component: UserListMedaliAbidiComponent;
  let fixture: ComponentFixture<UserListMedaliAbidiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListMedaliAbidiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListMedaliAbidiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
