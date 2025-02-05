import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositpromoComponent } from './depositpromo.component';

describe('DepositpromoComponent', () => {
  let component: DepositpromoComponent;
  let fixture: ComponentFixture<DepositpromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositpromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
