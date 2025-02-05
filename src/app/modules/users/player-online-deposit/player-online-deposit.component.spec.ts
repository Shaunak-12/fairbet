import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOnlineDepositComponent } from './player-online-deposit.component';

describe('PlayerOnlineDepositComponent', () => {
  let component: PlayerOnlineDepositComponent;
  let fixture: ComponentFixture<PlayerOnlineDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerOnlineDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerOnlineDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
