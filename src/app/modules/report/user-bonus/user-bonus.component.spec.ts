import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBonusComponent } from './user-bonus.component';

describe('UserBonusComponent', () => {
  let component: UserBonusComponent;
  let fixture: ComponentFixture<UserBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBonusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
