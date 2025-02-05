import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRequestComponent } from './call-request.component';

describe('CallRequestComponent', () => {
  let component: CallRequestComponent;
  let fixture: ComponentFixture<CallRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
