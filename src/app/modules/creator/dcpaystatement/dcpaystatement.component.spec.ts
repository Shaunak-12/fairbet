import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpaystatementComponent } from './dcpaystatement.component';

describe('DcpaystatementComponent', () => {
  let component: DcpaystatementComponent;
  let fixture: ComponentFixture<DcpaystatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcpaystatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcpaystatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
