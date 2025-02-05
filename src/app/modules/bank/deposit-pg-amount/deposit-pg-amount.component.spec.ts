import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPgAmountComponent } from './deposit-pg-amount.component';

describe('DepositPgAmountComponent', () => {
  let component: DepositPgAmountComponent;
  let fixture: ComponentFixture<DepositPgAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositPgAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositPgAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
