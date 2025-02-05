import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelHistoryComponent } from './reel-history.component';

describe('ReelHistoryComponent', () => {
  let component: ReelHistoryComponent;
  let fixture: ComponentFixture<ReelHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReelHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
