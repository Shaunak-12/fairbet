import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUpiListComponent } from './bank-upi-list.component';

describe('BankUpiListComponent', () => {
  let component: BankUpiListComponent;
  let fixture: ComponentFixture<BankUpiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankUpiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankUpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
