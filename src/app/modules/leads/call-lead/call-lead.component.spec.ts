import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLeadComponent } from './call-lead.component';

describe('CallLeadComponent', () => {
  let component: CallLeadComponent;
  let fixture: ComponentFixture<CallLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
