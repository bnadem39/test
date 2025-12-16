import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListBenaliAdemComponent } from './user-list-benali-adem.component';

describe('UserListBenaliAdemComponent', () => {
  let component: UserListBenaliAdemComponent;
  let fixture: ComponentFixture<UserListBenaliAdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListBenaliAdemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListBenaliAdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
