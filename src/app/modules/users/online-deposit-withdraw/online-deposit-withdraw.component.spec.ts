import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDepositWithdrawComponent } from './online-deposit-withdraw.component';

describe('OnlineDepositWithdrawComponent', () => {
  let component: OnlineDepositWithdrawComponent;
  let fixture: ComponentFixture<OnlineDepositWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineDepositWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineDepositWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
