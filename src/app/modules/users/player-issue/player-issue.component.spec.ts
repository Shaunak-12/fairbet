import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerIssueComponent } from './player-issue.component';

describe('PlayerIssueComponent', () => {
  let component: PlayerIssueComponent;
  let fixture: ComponentFixture<PlayerIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
