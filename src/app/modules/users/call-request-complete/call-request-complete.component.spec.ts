import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRequestCompleteComponent } from './call-request-complete.component';

describe('CallRequestCompleteComponent', () => {
  let component: CallRequestCompleteComponent;
  let fixture: ComponentFixture<CallRequestCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallRequestCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallRequestCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
