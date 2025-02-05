import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailsIssueComponent } from './player-details-issue.component';

describe('PlayerDetailsIssueComponent', () => {
  let component: PlayerDetailsIssueComponent;
  let fixture: ComponentFixture<PlayerDetailsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDetailsIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerDetailsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
