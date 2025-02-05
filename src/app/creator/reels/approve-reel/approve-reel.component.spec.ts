import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReelComponent } from './approve-reel.component';

describe('ApproveReelComponent', () => {
  let component: ApproveReelComponent;
  let fixture: ComponentFixture<ApproveReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveReelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
