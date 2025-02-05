import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepositListComponent } from './user-deposit-list.component';

describe('UserDepositListComponent', () => {
  let component: UserDepositListComponent;
  let fixture: ComponentFixture<UserDepositListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDepositListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
