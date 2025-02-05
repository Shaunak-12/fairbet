import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOtpComponent } from './player-otp.component';

describe('PlayerOtpComponent', () => {
  let component: PlayerOtpComponent;
  let fixture: ComponentFixture<PlayerOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
