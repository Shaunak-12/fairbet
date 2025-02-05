import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDepositComponent } from './player-deposit.component';

describe('PlayerDepositComponent', () => {
  let component: PlayerDepositComponent;
  let fixture: ComponentFixture<PlayerDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
