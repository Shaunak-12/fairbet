import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCallLogComponent } from './player-call-log.component';

describe('PlayerCallLogComponent', () => {
  let component: PlayerCallLogComponent;
  let fixture: ComponentFixture<PlayerCallLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCallLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCallLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
