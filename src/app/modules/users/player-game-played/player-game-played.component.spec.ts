import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGamePlayedComponent } from './player-game-played.component';

describe('PlayerGamePlayedComponent', () => {
  let component: PlayerGamePlayedComponent;
  let fixture: ComponentFixture<PlayerGamePlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerGamePlayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerGamePlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
