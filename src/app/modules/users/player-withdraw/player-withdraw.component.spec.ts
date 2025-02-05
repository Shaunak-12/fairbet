import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWithdrawComponent } from './player-withdraw.component';

describe('PlayerWithdrawComponent', () => {
  let component: PlayerWithdrawComponent;
  let fixture: ComponentFixture<PlayerWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
